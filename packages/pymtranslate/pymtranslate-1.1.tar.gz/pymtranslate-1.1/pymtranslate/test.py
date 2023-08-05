import unittest
import os
import sys

from translator import Translator

english = 'pymtranslate/data/short.en'
foreign = 'pymtranslate/data/short.de'
wordList = 'pymtranslate/data/devwords'


class TestTranslationFunctions(unittest.TestCase):

    def test_init(self):
        t = Translator(english, foreign, wordList)
        self.assertIn('the dog', t.en_dict)
        self.assertIsNot(t.en_words, [])
        self.assertIn('der Hund', t.de_dict)
        self.assertIsNot(t.de_words, [])

    def test_tef_init(self):
        t = Translator(english, foreign, wordList)
        self.assertFalse(t.transmissions)  # empty object
        t.initTef()
        self.assertEquals(t.transmissions, {'bus': {"der": 0.5, 'Bus': 0.5}, 'the': {"der": 0.2, 'Hund': 0.2, 'die': 0.2, 'Bus': 0.2, 'Katze': 0.2},
                                            'dog': {'Hund': 0.5, 'der': 0.5}, 'cat': {'die': 0.5, 'Katze': 0.5}})  # contains probabdie matches

    def test_EM_transitions(self):
        t = Translator(english, foreign, wordList)
        self.assertFalse(t.countef)  # empty object for counting mappings
        self.assertFalse(t.totalf)  # empty object
        t.initTef()
        t.iterateEM(10)
        self.assertTrue(t.transmissions)
        # self.assertTrue(t.totalf)
