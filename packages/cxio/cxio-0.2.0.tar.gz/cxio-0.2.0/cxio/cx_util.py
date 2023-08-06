

class CxUtil(object):
    """ Static utility and convenience methods.
    """

    @staticmethod
    def write_aspect_fragment(cx_writer, aspect_elements):
        """ Convenience method to write a list of aspect elements ("aspect fragment").
        :param cx_writer: CxWriter
            A CxWriter ready to write aspect elements.
        :param aspect_elements: list
            The list of AspectElement (of the same category) to be written out.
        """
        if len(aspect_elements) > 0:
            name = aspect_elements[0].get_name()
            cx_writer.start_aspect_fragment(name)
            for aspect_element in aspect_elements:
                if not name == aspect_element.get_name():
                    raise ValueError('"' + str(name) + '" different from "' + str(aspect_element.get_name() + '"'))
                cx_writer.write_aspect_element(aspect_element)
            cx_writer.end_aspect_fragment()



