import sys


class Translator(object):

    def __init__(self, data):

        self.de_words = []
        self.de_dict = []
        self.en_words = []
        self.en_dict = []
        self.dev_words = []
        self.sent_pairs = []

        self.probs = {}
        self.transmissions = {}  # this is t(e|f)
        self.countef = {}  # this countef
        self.totalf = {}
        self.totals = {}
        self.data = data  # this holds all the sysargs

        self.en_dict, self.en_words = self.convertArgsToTokens(self.data[1])
        self.de_dict, self.de_words = self.convertArgsToTokens(self.data[2])

        self.dev_in = open(self.data[3], 'r')
        self.dev_lines = self.dev_in.readlines()
        self.dev_in.close()

        for index in range(len(self.en_dict)):
            pair = (self.en_dict[index], self.de_dict[index])
            self.sent_pairs.append(pair)

    def printInfo(self):
        for line in self.dev_lines:
            self.dev_words += line.split()

        # print self.transmissions['man']
        for word in self.dev_words:
            print"==================================="
            print"==================================="
            print "English Word: " + word
            print "Foreign Words & Probabilities:"
            if (word not in self.transmissions):
                print 'no matches found'
                continue
            trans = self.transmissions[word]

            # print out a sorted list of all non-zero trans
            print sorted(((k, v) for k, v in trans.iteritems() if v != 0), reverse=True)

    def convertArgsToTokens(self, data):
        """
        this converts the readin lines from
        sys to useable format, returns list
        of token and dict of tokens
        """

        tdict = []
        tokens = []

        d = open(data, 'r')
        for line in d.readlines():
            tdict.append(line.rstrip())
            tokens += line.split()

        d.close()
        tokens = list(set(tokens))

        return tdict, tokens

    def initTef(self):
        ''' 
        get all probable matches
        and then initialize t(f|e)
        '''
        probs = {}
        transmissions = {}

        # go through each german word
        for word in self.en_words:
            word_poss = []
            # if word in sentence.. then
            for sent in self.en_dict:
                if word in sent:
                    matching = self.de_dict[self.en_dict.index(sent)]
                    word_poss = word_poss + matching.split()

            # remove the duplicates
            word_poss = list(set(word_poss))
            # add the probable matches
            probs[word] = word_poss

        self.probs = probs
        print 'PROBS!!!'
        print self.probs

        for word in self.en_words:
            # print self.probs
            word_probs = self.probs[word]
            if (len(word_probs) == 0):
                print word, word_probs
            uniform_prob = 1.0 / len(word_probs)

            word_probs = dict([(w, uniform_prob) for w in word_probs])

            # save word_probs
            transmissions[word] = word_probs

        self.transmissions = transmissions

    def iterateEM(self, count):
        '''
        Iterate through all transmissions of english to
        foreign words. keep count of repeated occurences
         do until convergence
           set count(e|f) to 0 for all e,f
           set total(f) to 0 for all f
           for all sentence pairs (e_s,f_s)
             set total_s(e) = 0 for all e
             for all words e in e_s
               for all words f in f_s
                 total_s(e) += t(e|f)
             for all words e in e_s
               for all words f in f_s
                 count(e|f) += t(e|f) / total_s(e)
                 total(f)   += t(e|f) / total_s(e)
           for all f
             for all e
               t(e|f) = count(e|f) / total(f)
        '''

        for iter in range(count):
            # print "ITERATION #("+str(iter + 1)+")\n"

            countef = {}
            totalf = {}
            # set the count of the words to zero
            for word in self.en_words:
                if(word not in self.probs):
                    continue

                word_probs = self.probs[word]

                count = dict([(w, 0) for w in word_probs])
                countef[word] = count
                totalf[word] = 0

            self.countef = countef

            self.totalf = totalf

            # NOW iterate over each word pair
            for (es, ds) in self.sent_pairs:
                es_split = es.split()
                ds_split = ds.split()

                for d in ds_split:
                    self.totals[d] = 0
                    for e in es_split:

                        if (e not in self.transmissions):
                            continue

                        e_trans = self.transmissions[e]

                        if (d not in e_trans):
                            continue

                        self.totals[d] += e_trans[d]

                    # Get count(e|f) and total(f)
                    for e in es_split:
                        if(e not in self.transmissions):
                            continue
                        if (d not in self.transmissions[e]):
                            continue
                        self.countef[e][
                            d] += self.transmissions[e][d] / self.totals[d]
                        self.totalf[
                            e] += self.transmissions[e][d] / self.totals[d]

            for e in self.en_words:
                if (e not in self.probs):
                    continue
                e_prob = self.probs[e]
                for d in e_prob:
                    self.transmissions[e][d] = self.countef[
                        e][d] / self.totalf[e]


def main():
    print "Translating English words..."
    args = sys.argv
    if len(args) < 4:
        print "--*INCORRECT FORMAT*--"
        print "python translator.py <english corpus> <foreign corpus> <testfile>"
        exit()

    translator = Translator(args)  # init class
    translator.initTef()	  # init stat model
    translator.iterateEM(10)  # run iterations
    translator.printInfo()	  # print matches

if __name__ == "__main__":
    main()
