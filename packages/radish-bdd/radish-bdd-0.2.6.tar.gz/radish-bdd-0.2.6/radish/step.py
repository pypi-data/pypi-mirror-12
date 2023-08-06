# -*- coding: utf-8 -*-

"""
    This module provides a class to represent a Step
"""

from radish.model import Model
from radish.exceptions import RadishError
from radish.terrain import world
from radish.stepregistry import StepRegistry
from radish.matcher import Matcher
import radish.utils as utils


class Step(Model):
    """
        Represents a step
    """
    class State(object):
        """
            Represents the step state

            FIXME: for the python3 version this should be an Enum
        """
        UNTESTED = "untested"
        SKIPPED = "skipped"
        PASSED = "passed"
        FAILED = "failed"

    def __init__(self, id, sentence, path, line, parent, runable):
        super(Step, self).__init__(id, None, sentence, path, line, parent)
        self.table = []
        self.raw_text = []
        self.definition_func = None
        self.arguments = None
        self.keyword_arguments = None
        self.state = Step.State.UNTESTED
        self.failure = None
        self.runable = runable
        self.as_precondition = None

    @property
    def context(self):
        """
            Returns the scenario context belonging to this step
        """
        return self.parent.context

    @property
    def expanded_sentence(self):
        """
            Returns the expanded sentence of this step

                * Expand variables
        """
        sentence = self.sentence
        for name, value in self.parent.variables:
            sentence = sentence.replace("${%s}" % name, value)
        return sentence

    @property
    def text(self):
        """
            Returns the additional text of this step as string
        """
        return "\n".join(self.raw_text)

    def _validate(self):
        """
            Checks if the step is valid to run or not
        """

        if not self.definition_func or not callable(self.definition_func):
            raise RadishError("The step '{}' does not have a step definition".format(self.sentence))

    def run(self):
        """
            Runs the step.
        """
        if not self.runable:
            self.state = Step.State.UNTESTED
            return self.state

        self._validate()

        try:
            if self.keyword_arguments:
                self.definition_func(self, **self.keyword_arguments)  # pylint: disable=not-callable
            else:
                self.definition_func(self, *self.arguments)  # pylint: disable=not-callable
        except Exception as e:  # pylint: disable=broad-except
            self.state = Step.State.FAILED
            self.failure = utils.Failure(e)
        else:
            self.state = Step.State.PASSED
        return self.state

    def debug(self):
        """
            Debugs the step
        """
        if not self.runable:
            self.state = Step.State.UNTESTED
            return self.state

        self._validate()

        pdb = utils.get_debugger()

        try:
            pdb.runcall(self.definition_func, self, *self.arguments, **self.keyword_arguments)
        except Exception as e:  # pylint: disable=broad-except
            self.state = Step.State.FAILED
            self.failure = utils.Failure(e)
        else:
            self.state = Step.State.PASSED
        return self.state

    def skip(self):
        """
            Skips the step
        """
        self.state = Step.State.SKIPPED

    def behave_like(self, sentence):
        """
            Make step behave like another one

            :param string sentence: the sentence of the step to behave like
        """
        # check if this step has already failed from a previous behave_like call
        if self.state is Step.State.FAILED:
            return

        # create step according to given sentence
        new_step = Step(None, sentence, self.path, self.line, self.parent, True)
        Matcher.merge_step(new_step, StepRegistry().steps)

        # run or debug step
        if world.config.debug_steps:
            new_step.debug()
        else:
            new_step.run()

        # re-raise exception if the failed
        if new_step.state is Step.State.FAILED:
            new_step.failure.exception.args = ("Step '{}' failed: '{}'".format(sentence, new_step.failure.exception.message),)
            raise new_step.failure.exception
