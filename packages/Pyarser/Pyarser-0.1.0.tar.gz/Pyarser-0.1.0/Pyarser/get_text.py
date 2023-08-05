import requests
import re

class openers(object):
    #functions to open websites in raw form of different formats
    def open_site(link):
        portal = requests.get(link)
        try:
            assert type(portal.text) == str
            return portal.text
        except AssertionError:
            return str(portal.text)

    def open_bytesite(link):
        portal = openers.open_site(link).encode("UTF-8")
        return portal
    def site_charlst(link):
        return list(openers.open_site(link))


class modifiers(object):
#charlst refers to a list for one character strings.
    def delete_newlines(charlst):
        for elem in charlst:
            if elem == '\n':
                charlst.remove(elem)
        return charlst

    def delete_tabs(charlst):
        for elem in charlst:
            if elem == '\t':
                charlst.remove(elem)
        return charlst

    def delete_section(charlst, start, end):
        del charlst[start:end]

    def find_first_bracket(charlst):
        start, end = 0, 0
        while charlst[start] != '<':
            start += 1
        end = start
        while charlst[end] != '>':
            end += 1
        return start, end
    def find_all_brackets(charlst):
        copylst = charlst[:]
        left_brkts, right_brkts = [], []
        for elem in copylst:
            if elem == '<':
                left_brkts.append(copylst.index(elem))
                copylst[copylst.index(elem)] = 'DEL'
            if elem == '>':
                right_brkts.append(copylst.index(elem))
                copylst[copylst.index(elem)] = 'DEL'
        return list(zip(left_brkts, right_brkts))

    def remove_first_bracket(charlst):
        #removes the first bracket and the contents of it
        first = modifiers.find_first_bracket(charlst)
        modifiers.delete_section(charlst, first[0], first[1]+1)

    def remove_all_brackets(charlst):
        #removes all brackets from a char list in linear fashion, slow for large documents.
        while '<' in charlst:
            modifiers.remove_first_bracket(charlst)
        return charlst

    def split_from_brackets(string):
        #removes all bracket tags from a string. Fast, useful for large.
        splitter = re.split("<[^<>]*>", string)
        return splitter


    def remove_symbols(charlst):
        #removes symbols not considered to be linguistically readable.
        symbols = {'-', '+', '(', ')', '{', '}', '[', ']', '=', '^'}
        for elem in charlst:
            if elem in symbols:
                charlst.remove(elem)
        return charlst

class harvestors(object):

    #Class that contains function to build data structures based off information from the HTML page.
    def tag_count(string):
    #counts the occurrences of tags in an HTML string and returns a dictionary of them
        temp = re.compile(r"<[^<>]+>")
        tags = temp.findall(string)
        count_dict = {elem:tags.count(elem) for elem in tags}
        return count_dict

    def tag_lst(string):
        #returns a list of <*>___<*> formatted fragments of an HTML String.
        temp = re.compile(r"<[^<>]+>[^<>]*<[^<>]+>")
        tags = temp.findall(string)
        return tags

class filters(object):
    #Class that contains functions to remove snippets of text based on thresholds.
    #These functions must be used with split lists, NOT char lists. They filter out entire expressions, not characters
    def contains_numbers(splitlst):
        temp = re.compile(r"[0-9]+")
        fragments = []
        for elem in splitlst:
            if temp.search(elem):
                fragments.append(elem)
        return fragments

    def only_numbers(splitlst):
        temp = re.compile(r"^[0-9]+$")
        fragments = []
        for elem in splitlst:
            if temp.match(elem):
                fragments.append(elem)
        return fragments

    def no_numbers(splitlst):
        temp = re.compile(r"^[^0-9]+$")
        fragments = []
        for elem in splitlst:
            if temp.search(elem):
                fragments.append(elem)
        return fragments

    def contains_phrase(phrase, splitlst):
        segment = r"^.*%s.*$" %(phrase)
        temp = re.compile(segment)
        fragments = []
        for elem in splitlst:
            if temp.match(elem):
                fragments.append(elem)
        return fragments

    def no_phrase(phrase, splitlst):
        segment = r"^[^%s]+$" %(phrase)
        temp = re.compile(segment)
        fragments = []
        for elem in splitlst:
            if temp.search(elem):
                fragments.append(elem)
        return fragments

    def contains_words(words, splitlst):
        #Used to determine if a segment contains any of the words
        #does not take into account spaces between words
        segments = [r"^.*%s.*$" %(phrase) for phrase in words]
        fragments = []
        for elem in splitlst:
            for temp in segments:
                if re.match(temp, elem):
                    fragments.append(elem)
        return fragments

    def contains_words_spaced(words, splitlst):
        #checks if a word on it's own is present in the splits.
        segments = [r"^.* %s .*$" %(phrase) for phrase in words]
        fragments = []
        for elem in splitlst:
            for temp in segments:
                if re.match(temp, elem):
                    fragments.append(elem)
        return fragments

    def contains_id(ident, splitlst):
        #returns HTML element fragment that has a specific ID
        segment = r"^.*id='%s'.*$" %(ident)
        temp = re.compile(segment)
        return [elem for elem in splitlst if temp.match(elem)]

    def contains_value(val, splitlst):
        #returns HTML element fragment that has a specific value
        segment = r"^.*value='%s'.*$" %(val)
        temp = re.compile(segment)
        return [elem for elem in splitlst if temp.match(elem)]


class Element(object):

    def __init__(self, tag, data):
        self.tag = tag
        self.data = data
        self.datalst = self.data.split()
    def __len__(self):
        return len(self.data)