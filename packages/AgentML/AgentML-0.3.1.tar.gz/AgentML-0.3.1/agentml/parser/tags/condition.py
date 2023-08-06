import os
import logging
from agentml.common import schema
from agentml.parser.tags import Tag
from agentml.parser.trigger.condition import BaseCondition


class Condition(Tag, BaseCondition):
    def __init__(self, trigger, element):
        """
        Initialize a new Condition Tag instance
        :param trigger: The Trigger instance
        :type  trigger: Trigger

        :param element: The XML Element object
        :type  element: etree._Element
        """
        BaseCondition.__init__(self, trigger.agentml, element)
        Tag.__init__(self, trigger, element)
        self._log = logging.getLogger('agentml.parser.tags.condition')

        # Define our schema
        with open(os.path.join(self.trigger.agentml.script_path, 'schemas', 'tags', 'condition.rng')) as file:
            self.schema = schema(file.read())

    def get_contents(self, element):
        """
        Retrieve the contents of an element
        :param element: The XML Element object
        :type  element: etree._Element

        :return: A list of text and/or tags
        :rtype : list of str or Tag
        """
        return self.agentml.parse_tags(element, self.trigger)

    def value(self):
        """
        Return the current evaluation of a condition statement
        """
        return ''.join(map(str, self.evaluate(self.trigger.user)))
