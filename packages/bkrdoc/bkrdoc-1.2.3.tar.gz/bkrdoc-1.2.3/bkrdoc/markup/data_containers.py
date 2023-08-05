__author__ = 'jkulda'

import shlex


class SimpleContainer(object):

    comments_list = []
    statement_list = []
    common_comments = []
    name = ""

    def add_comment(self, comment_container):
        self.comments_list.append(comment_container)

    def add_statement_line(self, line):
        self.statement_list.append(line)

    def add_common_comment(self, common_comment):
        self.common_comments.append(common_comment)

    def get_statement_list(self):
        pom_list = []
        for member in self.statement_list:
            if self.is_simple_container_instance(member):
                if self.is_condition_container(member):
                    pom_list += member.get_statement_list()
                    for elif_member in member.elif_parts:
                        if self.is_simple_container_instance(elif_member):
                            pom_list += elif_member.get_statement_list()
                else:
                    pom_list += member.get_statement_list()
            else:
                pom_list.append(member)
        return pom_list

    def get_comments_list(self):
        pom_list = []
        for member in self.comments_list:
            if self.is_simple_container_instance(member):
                if self.is_condition_container(member):
                    pom_list += member.get_comments_list()
                    for elif_member in member.elif_parts:
                        if self.is_simple_container_instance(elif_member):
                            pom_list += elif_member.get_comments_list()
                else:
                    pom_list += member.get_comments_list()
            else:
                pom_list.append(member.get_comments())
        return pom_list

    def comments_set_up(self):
        for comment in self.comments_list:
            if self.is_simple_container_instance(comment):
                if self.is_condition_container(comment):
                    comment.comments_set_up()
                    for elif_comment in comment.elif_parts:
                        if self.is_simple_container_instance(elif_comment):
                            elif_comment.comments_set_up()
                else:
                    comment.comments_set_up()
            else:
                try:
                    comment.search_for_tags()
                except UnknownTagException as detail:
                    print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                    print("Unknown Tag Exception: \"{0}\"".format(detail))
                    print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")

    def get_additional_containers(self, func, loop, cond):
        for comment in self.comments_list:
            if self.is_simple_container_instance(comment):
                # print comment
                if self.is_function_container(comment):
                    func.append(comment)
                    func, loop, cond = comment.get_additional_containers(func, loop, cond)
                elif self.is_loop_container(comment):
                    loop.append(comment)
                    func, loop, cond = comment.get_additional_containers(func, loop, cond)
                elif self.is_condition_container(comment):
                    cond.append(comment)
                    func, loop, cond = comment.get_additional_containers(func, loop, cond)
                    for element in comment.elif_parts:
                        if self.is_simple_container_instance(element):
                            func, loop, cond = element.get_additional_containers(func, loop, cond)
        return func, loop, cond

    def print_documentation(self):
        documentation = ""
        if not self.is_comment_list_empty():
            if self.is_test_phase_container():
                documentation += "  {0} {1}\n".format(self.name, self.name_comment)
            else:
                documentation += "  {0}\n".format(self.name)
            if self.is_outside_phase_container():
                documentation += self.print_comments_with_offset("    ")
            else:
                documentation += self.print_comments_with_offset("      ")
            documentation += "\n"
        return documentation

    def get_additional_phase_data(self):
        pass

    def is_comment_list_empty(self):
        if not self.comments_list:
            return False
        else:
            return self.search_for_emptiness(self.comments_list)

    def print_comments_with_offset(self, offset):
        documentation = ""
        documentation_tag = self.get_name()

        if not self.is_comment_list_empty():
            first = True
            for comment in self.comments_list:
                if self.is_simple_container_instance(comment):
                    # print "LOL {0}".format(documentation_tag)
                    # print self.comments_list
                    if first:
                        # print "???..."
                        documentation += "{0}{1}:\n".format(offset[2:], documentation_tag)
                        first = False
                    if self.is_condition_container(comment):
                        documentation += comment.print_comments_with_offset(offset + "  ")
                        for elif_comment in comment.elif_parts:
                            if self.is_simple_container_instance(elif_comment):
                                documentation += elif_comment.print_comments_with_offset(offset + "  ")
                    else:
                        # print "???"
                        documentation += comment.print_comments_with_offset(offset + "  ")
                else:
                    if first:
                        if self.is_setup_test_cleanup_tag(documentation_tag):
                            documentation += comment.print_data(offset[2:], "")
                            # print "{0} !!!!!!! {1}".format(documentation_tag, type(comment).__name__)
                        elif self.is_condition_container(self):
                            # print "{0} +++++++++++++++++ {1} in {2}".format(documentation_tag, type(comment).__name__, type(self).__name__)
                            if not self.search_for_emptiness(self.comments_list) and \
                                    self.search_for_emptiness(self.comments_list[1:]) and \
                                    self.comments_list[0].is_description_comment():
                                if self.search_for_emptiness(self.elif_parts):
                                    documentation += comment.print_data(offset[2:], "")
                                else:
                                    documentation += comment.print_data(offset, documentation_tag)
                            else:
                                documentation += comment.print_data(offset, documentation_tag)
                        elif self.is_loop_container(self):
                            if self.comments_list[0].is_description_comment() and self.search_for_emptiness(self.comments_list[1:]):
                                documentation += comment.print_data(offset[2:], "")
                            else:
                                # print "{0} /////////////////// {1} in {2}".format(documentation_tag, type(comment).__name__, type(self).__name__)
                                documentation += comment.print_data(offset, documentation_tag)
                        else:
                            documentation += comment.print_data(offset, documentation_tag)
                            # print "{0} --------- {1} in {2}".format(documentation_tag, type(comment).__name__, type(self).__name__)
                        first = False
                    else:
                        # print "{0} :::::::: {1}".format(documentation_tag, type(comment).__name__)
                        documentation += comment.print_data(offset, "")
            return documentation
        return ""

    def get_name(self):
        pass

    def search_for_emptiness(self, data):
        empty = True
        for member in data:
            if self.is_simple_container_instance(member):
                if not member.is_comment_list_empty():
                    empty = False
            elif self.is_tagged_comment_container(member):
                return False
        return empty

    def is_simple_container_instance(self, container):
        container_names = ["LoopContainer", "FunctionContainer", "ConditionContainer"]
        return type(container).__name__ in container_names

    def is_test_phase_container(self):
        return type(self).__name__ == "TestPhaseContainer"

    def is_outside_phase_container(self):
        return type(self).__name__ == "PhaseOutsideContainer"

    def is_loop_container(self, container):
        return type(container).__name__ == "LoopContainer"

    def is_function_container(self, container):
        return type(container).__name__ == "FunctionContainer"

    def is_condition_container(self, container):
        return type(container).__name__ == "ConditionContainer"

    def is_setup_test_cleanup_tag(self, tag):
        tags = ["Cleanup", "Setup", "Test"]
        return tag in tags

    def is_tagged_comment_container(self, container):
        return type(container).__name__ == "TaggedCommentContainer"


class PhaseOutsideContainer(SimpleContainer):

    name = "Outside Phase"

    def __init__(self):
        self.comments_list = []
        self.statement_list = []
        self.common_comments = []

    def search_for_title_data(self):
        new_coment = TaggedCommentContainer("")
        for common_comment in self.common_comments:
            if self.is_word_in_line(common_comment, "keywords:"):
                index = self.get_word_index_in_line(common_comment, "keywords:")
                data = new_coment.set_documentation_comment(common_comment[index + 1:])
                if new_coment.is_know_tag_empty("keywords"):
                    new_coment.known_tags["keywords"] = data
                else:
                    new_coment.known_tags["keywords"] += ", {0}".format(data)

            elif self.is_word_in_line(common_comment, "description:"):
                index = self.get_word_index_in_line(common_comment, "description:")
                data = new_coment.set_documentation_comment(common_comment[index + 1:])
                if new_coment.is_know_tag_empty("description"):
                    new_coment.known_tags["description"] = data
                else:
                    new_coment.known_tags["description"] += ", {0}".format(data)

            elif self.is_word_in_line(common_comment, "author:"):
                index = self.get_word_index_in_line(common_comment, "author:")
                data = new_coment.set_documentation_comment(common_comment[index + 1:])
                if new_coment.is_know_tag_empty("author"):
                    new_coment.known_tags["author"] = data
                else:
                    new_coment.known_tags["author"] += ", {0}".format(data)
        self.comments_list.insert(0, new_coment)
        new_coment = ""

    def get_name(self):
        return self.name

    def is_word_in_line(self, splitted_line, word):
        splitted_line = [element.lower() for element in splitted_line]
        return word in splitted_line

    def get_word_index_in_line(self, splitted_line, word):
        splitted_line = [element.lower() for element in splitted_line]
        try:
            return splitted_line.index(word)
        except ValueError:
            return 0


class TestPhaseContainer(SimpleContainer):

    def __init__(self):
        self.name = ""
        self.name_comment = ""
        self.comments_list = []
        self.statement_list = []
        self.common_comments = []

    def get_name(self):
        return self.name

    def add_statement_line(self, line):
        if self.is_name_empty() and len(self.statement_list) == 0:
            self.set_test_phase_name(line)
        else:
            self.statement_list.append(line)

    def is_name_empty(self):
        return self.name == ""

    def set_test_phase_name(self, line):
        line = shlex.split(line, posix=False)
        self.name = line[0][len("rlPhaseStart"):]
        if len(line) > 1:
            self.name_comment = line[1]


class ConditionContainer(SimpleContainer):
    condition_tag = "condition"
    elif_parts = []

    def __init__(self):
        self.comments_list = []
        self.statement_list = []
        self.common_comments = []
        self.elif_parts = []

    def get_additional_phase_data(self):
        offset = "    "
        documentation = "{0}{1}\n".format(offset, self.statement_list[0])
        for comment in self.comments_list:
            if not self.is_simple_container_instance(comment):
                documentation += comment.print_doc_comments_with_offset(offset + "  ")
        return documentation

    def add_elif_part(self, container):
        self.elif_parts.append(container)

    def get_name(self):
        if self.is_elif_in_line(self.statement_list[0]):
            return "elif"
        elif self.is_else_in_line(self.statement_list[0]):
            return "else"
        elif self.is_if_in_line(self.statement_list[0]):
            return "if"
        return self.condition_tag

    def is_elif_in_line(self, line):
        return line.find("elif") > -1

    def is_else_in_line(self, line):
        return line.find("else", 0, 5) > -1

    def is_if_in_line(self, line):
        return line.find("if", 0, 3) > -1

    def is_comment_list_empty(self):
        if not self.comments_list and not self.elif_parts:
            return True
        elif not self.comments_list and self.elif_parts:
            return self.search_for_emptiness(self.elif_parts)
        elif self.comments_list and not self.elif_parts:
            return self.search_for_emptiness(self.comments_list)
        else:
            empty = True
            if not self.search_for_emptiness(self.comments_list):
                empty = False
            if not self.search_for_emptiness(self.elif_parts):
                empty = False
            return empty


class FunctionContainer(SimpleContainer):
    function_tag = "function"

    def __init__(self):
        self.comments_list = []
        self.statement_list = []
        self.common_comments = []

    def get_additional_phase_data(self):
        offset = "    "
        documentation = "{0}{1}\n".format(offset, self.statement_list[0])
        documentation += offset + "{\n"
        for comment in self.comments_list:
            if not self.is_simple_container_instance(comment):
                documentation += comment.print_doc_comments_with_offset(offset + "  ")
        documentation += offset + "}\n"
        return documentation

    def get_name(self):
        return self.function_tag


class LoopContainer(SimpleContainer):
    loop_tag = "loop"

    def __init__(self):
        self.comments_list = []
        self.statement_list = []
        self.common_comments = []

    def get_additional_phase_data(self):
        offset = "    "
        documentation = "{0}{1}\n".format(offset, self.statement_list[0])
        documentation += "{0}do\n".format(offset)
        for comment in self.comments_list:
            if not self.is_simple_container_instance(comment):
                documentation += comment.print_doc_comments_with_offset(offset + "  ")
        documentation += "{0}done\n".format(offset)
        return documentation

    def get_name(self):
        if self.is_for_in_line(self.statement_list[0]):
            return "for"
        elif self.is_while_in_line(self.statement_list[0]):
            return "while"
        return self.loop_tag

    def is_for_in_line(self, line):
        return line.find("for", 0, 4) > -1

    def is_while_in_line(self, line):
        return line.find("while", 0, 6) > -1

    def is_do_while_in_line(self, line):
        return line.find("do", 0, 3) > -1

    def is_comment_list_empty(self):
        empty = True
        if not self.comments_list:
            return True
        else:
            return self.search_for_emptiness(self.comments_list)


class TaggedCommentContainer(object):

    known_tags = {"keywords": "", "key": "", "author": "", "description": ""}
    condition_tags = []
    comments = []
    tagged_line = ""
    documentation_comments = []

    def __init__(self, first_comment):
        self.comments = [first_comment]
        self.tagged_line = ""
        self.condition_tags = []
        self.documentation_comments = []

    def add_comment(self, comment):
        self.comments.append(comment)

    def add_tagged_line(self, line):
        self.tagged_line = line

    def get_comments(self):
        return self.comments

    def add_condition_tag(self, given_tag):
        self.condition_tags.append(given_tag)

    def erase_known_tags(self):
        self.known_tags["keywords"] = ""
        self.known_tags["key"] = ""
        self.known_tags["author"] = ""
        self.known_tags["description"] = ""

    def print_doc_comments_with_offset(self, offset):
        documentation = ""
        for comment in self.documentation_comments:
            documentation += "{0}{1}\n".format(offset, comment)
        return documentation

    def print_data(self, offset, documentation_tag):
        first = True
        documentation = ""
        #print "tag{0}".format(documentation_tag)
        for comment in self.documentation_comments:
            #print "Comment {0} with tagged line {1}".format(comment, self.tagged_line)
            if self.is_code_tag():
                if documentation_tag:
                    documentation += "{0}{1}: \n".format(offset[2:], documentation_tag)
                documentation += "{0}code: {1}\n".format(offset, comment)
            elif not self.is_splitted_line_empty(self.tagged_line):
                if documentation_tag and first:
                    if not self.is_function_loop_condition_line(self.tagged_line):
                        documentation += "{0}{1}: \n".format(offset[2:], documentation_tag)
                        documentation += "{0}{1}\n".format(offset, comment)
                    else:
                        documentation += "{0}{1}: {2}\n".format(offset[2:], documentation_tag, comment)
                    first = False

                elif self.is_function_loop_condition_line(self.tagged_line) and not first:
                    documentation += "{0}- {1}\n".format(offset[1:], comment)

                else:
                    #print "Comment {0} with tagged line {1}".format(comment, self.tagged_line)
                    #print "first {0}".format(first)
                    #print "documentation_tag {0}".format(documentation_tag)
                    documentation += "{0}{1}\n".format(offset, comment)

            else:
                documentation += "{0}{1}\n".format(offset, comment)
        return documentation

    def is_code_tag(self):
        if not self.is_splitted_line_empty(self.condition_tags):
            return self.condition_tags[0] == "code"
        return False

    def get_title_data(self):
        return self.known_tags

    def search_for_tags(self):
        for comment in self.comments:
            if self.get_tag_in_line(comment):
                found_tag = self.get_tag_in_line(comment)[0]
                if self.is_known_tag(self.get_tag_from_word(found_tag)):
                    known_tags_data = self.set_documentation_comment(comment[comment.index(found_tag) + 1:])
                    if self.is_know_tag_empty(self.get_tag_from_word(found_tag)):
                        self.known_tags[self.get_tag_from_word(found_tag)] = known_tags_data
                    else:
                        self.known_tags[self.get_tag_from_word(found_tag)] += ", {0}".format(known_tags_data)
                    # print self.known_tags
                    # print self.known_tags[self.get_tag_from_word(found_tag)]
                else:
                    raise UnknownTagException("Not supported tag: {0}. If it's needed write an e-mail to "
                                              "jkulda@redhat.com.".format(self.get_tag_from_word(found_tag)))
            else:
                erased_comment_line = self.erase_comments_start_tags(comment)
                if self.is_code_tag():
                    erased_comment_line = self.erase_comments_start_tags(self.tagged_line)
                self.documentation_comments.append(self.set_documentation_comment(erased_comment_line))
                # print self.documentation_comments

    def is_know_tag_empty(self, key):
        return self.known_tags[key] == ""

    def is_splitted_line_empty(self, splitted_line):
        return len(splitted_line) == 0

    def get_tag_in_line(self, splitted_line):
        return [word for word in splitted_line if ((word.startswith("@") and len(word) > 1) or word.startswith("#@@"))]

    def is_known_tag(self, tag):
        return tag in self.known_tags.keys()

    def erase_comments_start_tags(self, splitted_line):
        if splitted_line[0] == "#@":
            return splitted_line[1:]
        elif len(splitted_line) > 1 and splitted_line[0] == "#" and splitted_line[1] == "@":
            return splitted_line[2:]
        elif splitted_line[0].startswith("#@"):
            return [splitted_line[0][2:]] + splitted_line[1:]
        elif splitted_line[0].startswith("#"):
            if splitted_line[0] == "#":
                return splitted_line[1:]
            else:
                return [splitted_line[0][1:]] + splitted_line[1:]
        elif splitted_line[-1] == "#@":
            return splitted_line[0:-1]
        elif splitted_line[-1].endswith("#@"):
            return splitted_line[0:-2] + [splitted_line[-1][0:-3]]
        else:
            return splitted_line

    def set_documentation_comment(self, splitted_line):
        pom_line = splitted_line[0]
        for member in splitted_line[1:]:
            pom_line += " {0}".format(member)
        return pom_line

    def get_tag_from_word(self, word):
        if word.startswith("@"):
            return word[1:]
        else:
            return word[3:]

    def is_phase_start_xxx(self, splitted_line):
        phase_list = ["rlPhaseStartSetup", "rlPhaseStartCleanup", "rlPhaseStartTest"]
        if len(splitted_line) > 0:
            return splitted_line[0] in phase_list
        return False

    def is_condition_line(self, line):
        condition_line = ["if", "elif", "else"]
        return line[0] in condition_line

    def is_loop_line(self, line):
        loop_list = ["for", "while", "until"]
        return line[0] in loop_list

    def is_function_line(self, splitted_line):
        return splitted_line[0] == "function"

    def is_function_loop_condition_line(self, splitted_line):
        pom_list = ["if", "elif", "else", "for", "while", "until", "function"]
        return splitted_line[0] in pom_list

    def is_description_comment(self):
        return self.is_function_loop_condition_line(self.tagged_line)


class UnknownTagException(Exception):
    pass

