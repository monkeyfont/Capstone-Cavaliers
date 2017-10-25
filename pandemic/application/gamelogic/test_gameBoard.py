import unittest
from unittest import TestCase
from game import *


class TestGameBoardInitFunctions(TestCase):
    def setUp(self):
        """ Create the gameBoard, add players """
        d = {1: Player(1, "p1"), 2: Player(2, "p2"), 3: Player(3, "p3"), 4: Player(4, "p4")}
        self.testGameBoard = GameBoard(d, initialize = False)

    def test_generateCities(self):
        self.assertEqual(self.testGameBoard.generateCities().__len__(), 48)

    def test_generatePlayerDeck(self):
        # test to make sure all 48 player cards are in the player deck list
        # currently 3 event cards aswsell. If more event cards are added in, this test needs to be updated!
        self.assertEqual(self.testGameBoard.generatePlayerDeck().__len__(), 51)

    def test_generateInfectionDeck(self):
        self.assertEqual(self.testGameBoard.generateInfectionDeck().__len__(), 48)


    def test_distributeHand(self):
        # test num of cards for 4 players
        self.testGameBoard.playerDeck=self.testGameBoard.generatePlayerDeck()
        self.testGameBoard.distributeHand()
        for player in self.testGameBoard.players:
            self.assertEqual(self.testGameBoard.players[player].hand.__len__(), 2)

    def test_placeEpidemicCards(self):
        """ Ensure that epidemic cards are successfully placed into the deck. For the DEFAULT difficulty of 0, it should be 4."""
        self.testGameBoard.placeEpidemicCards()
        # check that the player deck contains 4 epidemic cards
        count = 0
        for card in self.testGameBoard.playerDeck:
            if card.type == "epidemic":
                count += 1
        self.assertEqual(count, 4)

    def test_setDifficultyEpidemicPlace(self):
        """
        Ensure that for difficutly of 1, there are 5 epidemic cards in the player deck.
        This test ensures the difficulty selector works.
        """
        self.testGameBoard.difficulty = 1
        self.testGameBoard.placeEpidemicCards()
        count = 0
        for card in self.testGameBoard.playerDeck:
            if card.type == "epidemic":
                count += 1
        self.assertEqual(count, 5)

    def test_infectCitiesStage(self):
        self.testGameBoard.cities = self.testGameBoard.generateCities()
        self.testGameBoard.infectionDeck=self.testGameBoard.generateInfectionDeck()

        self.testGameBoard.infectCitiesStage()
        # not sure how else to test this function as the cities that get infected are different every time
        self.assertEqual(self.testGameBoard.infectionDiscarded.__len__(),9)


    def test_startingLocation(self):
        """ Test that all players start in atlanta."""
        self.testGameBoard.setStartingLocation()
        for p in self.testGameBoard.players:
            playerObj = self.testGameBoard.players[p]
            self.assertEqual(playerObj.location, "ATLANTA")


class TestGameActions(TestCase):
    def setUp(self):
        """ Create the gameBoard, add players """
        d = {1: Player(1, "p1"), 2: Player(2, "p2"), 3: Player(3, "p3"), 4: Player(4, "p4")}
        self.testGameBoard = GameBoard(d, initialize = False)

    def test_Actions(self):
         # user should start with 4 actions.
        self.assertEquals(self.testGameBoard.players[1].actions, 4)

    def test_movePlayer(self):
        self.testGameBoard.cities = self.testGameBoard.generateCities()

        # test from starting position
        self.testGameBoard.movePlayer(1, "WASHINGTON")
        self.assertEqual(self.testGameBoard.players[1].location, "WASHINGTON")
        #test from a different position on board that should be able to move to.
        self.testGameBoard.players[1].location="LONDON"
        self.assertEqual(self.testGameBoard.players[1].location, "LONDON")


    def test_movePlayerFail(self):
        self.testGameBoard.cities = self.testGameBoard.generateCities()
        # should not be equal. The player shouldn't be able to move from ATLANTA to SEOUL.
        self.testGameBoard.movePlayer(1, "SEOUL")
        self.assertNotEqual(self.testGameBoard.players[1].location, "SEOUL")


    def test_directFlight(self):
        self.testGameBoard.cities = self.testGameBoard.generateCities()
        card1 = PlayerCard("SANFRANCISCO","blue","","","")
        self.testGameBoard.players[1].hand.append(card1)
        self.testGameBoard.players[1].location = "SEOUL"
        # should assert true as player 1 has sanfran card in their deck
        self.testGameBoard.directFlight(1, "SANFRANCISCO")
        self.assertTrue(self.testGameBoard.players[1].location, "SANFRANCISCO")

    def test_directFlightFail(self):
        self.testGameBoard.cities = self.testGameBoard.generateCities()
        card1 = PlayerCard("SANFRANCISCO", "blue", "", "", "")
        # should assert False as player doesn't have chicago in their hand.
        self.testGameBoard.directFlight(1, "CHICAGO")
        self.assertTrue(self.testGameBoard.players[1].location, "CHICAGO")


    def test_charterFlight(self):
        card1 = PlayerCard("SANFRANCISCO", "blue", "", "", "")
        self.testGameBoard.players[1].hand.append(card1)
        self.testGameBoard.players[1].location = "SANFRANCISCO"
        self.testGameBoard.charterFlight(1, "SANFRANCISCO", "SHANGHAI")
        self.assertTrue(self.testGameBoard.players[1].location, "SHANGHAI")



    def test_shuttleFlight(self):
        self.testGameBoard.cities = self.testGameBoard.generateCities()

        paris = self.testGameBoard.cities['PARIS']
        seoul = self.testGameBoard.cities['SEOUL']
        paris.researchStation = 1
        seoul.researchStation = 1
        self.testGameBoard.players[1].location = "PARIS"
        self.testGameBoard.shuttleFlight(1, "SEOUL")
        self.assertEqual(self.testGameBoard.players[1].location,"SEOUL")

    def test_shuttleFlightFail(self):
        """ Same as test above, but there is no research station in seoul. """
        self.testGameBoard.cities = self.testGameBoard.generateCities()

        paris = self.testGameBoard.cities['PARIS']
        seoul = self.testGameBoard.cities['SEOUL']
        paris.researchStation = 1
        seoul.researchStation = 0
        self.testGameBoard.players[1].location = "PARIS"
        self.testGameBoard.shuttleFlight(1, "SEOUL")
        self.assertNotEqual(self.testGameBoard.players[1].location, "SEOUL")


    def test_buildResearchStation(self):
        self.testGameBoard.cities = self.testGameBoard.generateCities()
        card1 = PlayerCard("SANFRANCISCO", "blue", "", "", "")
        self.testGameBoard.players[1].hand.append(card1)
        self.testGameBoard.players[1].location = "SANFRANCISCO"

        self.assertEqual(self.testGameBoard.cities["SANFRANCISCO"].researchStation, 0)
        self.testGameBoard.buildResearchStation(1,"SANFRANCISCO")
        self.assertEqual(self.testGameBoard.cities["SANFRANCISCO"].researchStation,1)



    def test_shareKnowledgeTake(self):
        self.testGameBoard.cities = self.testGameBoard.generateCities()
        self.testGameBoard.players[1].location="SHANGHAI"
        self.testGameBoard.players[2].location = "SHANGHAI"
        card = PlayerCard("SHANGHAI", "red", "", "", "")
        self.testGameBoard.players[2].hand.append(card)
        self.assertTrue(self.testGameBoard.shareKnowledgeTake(1,2,"SHANGHAI"))



    def test_shareKnowledgeGive(self):
        self.testGameBoard.cities = self.testGameBoard.generateCities()
        self.testGameBoard.players[1].location = "SHANGHAI"
        self.testGameBoard.players[2].location = "SHANGHAI"
        card = PlayerCard("SHANGHAI", "red", "", "", "")
        self.testGameBoard.players[1].hand.append(card)
        self.assertTrue(self.testGameBoard.shareKnowledgeGive(1, 2, "SHANGHAI"))

    def test_isPlayerAtResearchStation(self):
        self.testGameBoard.cities = self.testGameBoard.generateCities()
        paris = self.testGameBoard.cities['PARIS']
        paris.researchStation = 1
        self.testGameBoard.players[1].location = "PARIS"
        self.testGameBoard.players[2].location = "SHANGHAI"
        self.assertTrue(self.testGameBoard.isPlayerAtResearchStation(1))
        self.assertFalse(self.testGameBoard.isPlayerAtResearchStation(2))

    def test_discoverCure(self):
        self.testGameBoard.cities = self.testGameBoard.generateCities()
        paris = self.testGameBoard.cities['PARIS']
        paris.researchStation = 1
        self.testGameBoard.players[1].location = "PARIS"
        cities = ["SANFRANCISCO", "CHICAGO", "MONTREAL", "NEWYORK", "ATLANTA"]
        for card in cities:
            pcard=PlayerCard(card, "blue", "", "", "")
            self.testGameBoard.players[1].hand.append(pcard)
        result = self.testGameBoard.discoverCure(1,cities)
        # player should have used a move
        self.assertEqual(self.testGameBoard.players[1].actions, 3)
        # should be a validAction.
        self.assertTrue(result["validAction"])


    def test_discoverCureFail(self):
        """ This test only adds 4 cards to the player hand. It should fail."""
        self.testGameBoard.cities = self.testGameBoard.generateCities()
        paris = self.testGameBoard.cities['PARIS']
        paris.researchStation = 1
        self.testGameBoard.players[1].location = "PARIS"
        cities = ["SANFRANCISCO", "CHICAGO", "MONTREAL", "NEWYORK"]
        for card in cities:
            pcard=PlayerCard(card, "blue", "", "", "")
            self.testGameBoard.players[1].hand.append(pcard)
        result = self.testGameBoard.discoverCure(1,cities)
        # player actions should remain unchanged
        self.assertEqual(self.testGameBoard.players[1].actions, 4)

        # the JSON should return "validAction" = False...
        self.assertFalse(result["validAction"])

    def test_pass(self):
        """ user should have no actions after using passTurn."""
        self.testGameBoard.passTurn(1)
        self.assertEquals(self.testGameBoard.players[1].actions, 0)

    def test_treatDiseaseBlue(self):
        """
        ensure that the validAction dictionary is correct.
        Also tests a blue city ( ATLANTA ) is infected successfully.
        """
        # generate requirements
        self.testGameBoard.cities = self.testGameBoard.generateCities()
        card = PlayerCard("ATLANTA", "blue", "", "", "")
        self.testGameBoard.players[1].location = "ATLANTA"
        # infect atlanta
        atlanta = self.testGameBoard.cities['ATLANTA']
        atlanta.blue = 1
        result = self.testGameBoard.treatDisease(amount=1, colour="blue", playerId=1, targetCity="ATLANTA")
        # Make sure the infection is removed from the object.
        self.assertEquals(atlanta.blue, 0)
        # Make sure the action JSON returns True.
        self.assertEquals(result["validAction"], True)

    def test_treatDiseaseRed(self):
        """ Test for red (SHANGHAI)"""
        # generate requirements
        self.testGameBoard.cities = self.testGameBoard.generateCities()
        card = PlayerCard("SHANGHAI", "red", "", "", "")
        self.testGameBoard.players[1].location = "SHANGHAI"
        # infect atlanta
        shanghai = self.testGameBoard.cities['SHANGHAI']
        shanghai.red = 1
        result = self.testGameBoard.treatDisease(amount=1, colour="red", playerId=1, targetCity="SHANGHAI")
        # Make sure the infection is removed from the object.
        self.assertEquals(shanghai.red, 0)
        # Make sure the action JSON returns True.
        self.assertEquals(result["validAction"], True)

    def test_treatDiseaseYellow(self):
        """ Test for yellow (MIAMI)"""
        # generate requirements
        self.testGameBoard.cities = self.testGameBoard.generateCities()
        card = PlayerCard("MIAMI", "yellow", "", "", "")
        self.testGameBoard.players[1].location = "MIAMI"
        # infect atlanta
        miami = self.testGameBoard.cities['MIAMI']
        miami.yellow = 1
        result = self.testGameBoard.treatDisease(amount=1, colour="yellow", playerId=1, targetCity="MIAMI")
        # Make sure the infection is removed from the object.
        self.assertEquals(miami.yellow, 0)
        # Make sure the action JSON returns True.
        self.assertEquals(result["validAction"], True)

    def test_treatDiseaseBlack(self):
        """ Test for black (KOLKATA)"""
        # generate requirements
        self.testGameBoard.cities = self.testGameBoard.generateCities()
        card = PlayerCard("KOLKATA", "black", "", "", "")
        self.testGameBoard.players[1].location = "KOLKATA"
        # infect atlanta
        kolkata = self.testGameBoard.cities['KOLKATA']
        kolkata.black = 1
        result = self.testGameBoard.treatDisease(amount=1, colour="black", playerId=1, targetCity="KOLKATA")
        # Make sure the infection is removed from the object.
        self.assertEquals(kolkata.black, 0)
        # Make sure the action JSON returns True.
        self.assertEquals(result["validAction"], True)

    def test_treatDiseaseFail(self):
        """ the return dictionary from treatDisease should have validAction == False"""
        # generate requirements
        self.testGameBoard.cities = self.testGameBoard.generateCities()
        self.testGameBoard.players[1].location = "ATLANTA"
        result = self.testGameBoard.treatDisease(amount=1, colour="blue", playerId=1, targetCity="ATLANTA")
        # Make sure the action JSON returns True.
        self.assertEquals(result["validAction"], False)

    def test_treatDiseaseMultiple(self):
        """ Tests that treatDisease works for multiples."""
        # generate requirements
        self.testGameBoard.cities = self.testGameBoard.generateCities()
        card = PlayerCard("ATLANTA", "blue", "", "", "")
        self.testGameBoard.players[1].location = "ATLANTA"
        # infect atlanta
        atlanta = self.testGameBoard.cities['ATLANTA']
        atlanta.blue = 3
        result = self.testGameBoard.treatDisease(amount=2, colour="blue", playerId=1, targetCity="ATLANTA")
        # Make sure the infection is removed from the object.
        self.assertEquals(atlanta.blue, 1)
        # Make sure the action JSON returns True.
        self.assertEquals(result["validAction"], True)

    def test_treatDiseaseMultiple2(self):
        """ Tests that treatDisease works for multiples, even if the city doesn't have that many infections.
            Checking that treatDisease(amount=3) works for a city with only 1 infection.
        """
        # generate requirements
        self.testGameBoard.cities = self.testGameBoard.generateCities()
        card = PlayerCard("ATLANTA", "blue", "", "", "")
        self.testGameBoard.players[1].location = "ATLANTA"
        # infect atlanta
        atlanta = self.testGameBoard.cities['ATLANTA']
        atlanta.blue = 1
        result = self.testGameBoard.treatDisease(amount=3, colour="blue", playerId=1, targetCity="ATLANTA")
        # Make sure the infection is removed from the object.
        self.assertEquals(atlanta.blue, 0)
        # Make sure the action JSON returns True.
        self.assertEquals(result["validAction"], True)

    def test_playerDiscard(self):
        # add Atlanta to player 1 hand
        # remove atlanta with discardCard()
        # result should be true.
        # card should not be in their hand.
        card = PlayerCard("ATLANTA", "blue", "", "", "")
        player1 = self.testGameBoard.players[1]
        player1.hand.append(card)
        result = self.testGameBoard.discardCard(1, "ATLANTA")
        self.assertTrue(result)
        self.assertFalse(card in player1.hand)

    def test_playerDiscard2(self):
        # add several cards, including MIAMI to player 1 hand
        # remove atlanta with discardCard()
        # result should be true.
        # card should not be in their hand.
        card1 = PlayerCard("ATLANTA", "blue", "", "", "")
        card2 = PlayerCard("LONDON", "blue", "", "", "")
        card3 = PlayerCard("SYDNEY", "red", "", "", "")
        card4 = PlayerCard("MIAMI", "yellow", "", "", "")
        player1 = self.testGameBoard.players[1]
        player1.hand += [card1, card2, card3, card4]
        result = self.testGameBoard.discardCard(1, "MIAMI")
        self.assertTrue(result)
        self.assertFalse(card4 in player1.hand)

    def test_playerDiscardFails1(self):
        # removing a card from a players hand should be false if they don't have it.
        card = PlayerCard("ATLANTA", "blue", "", "", "")
        player1 = self.testGameBoard.players[1]
        player1.hand.append(card)
        result = self.testGameBoard.discardCard(1, "LONDON")
        self.assertFalse(result)



class TestGameCoordinator(TestCase):
    def setUp(self):
        """ Create the gameBoard, add players """
        self.players = {1: Player(1, "p1"), 2: Player(2, "p2"), 3: Player(3, "p3"), 4: Player(4, "p4")}
        self.testGameBoard = GameBoard(self.players, initialize = False)


    def test_forcedOutBreak(self):
        """
        This test will check that the cityOutBreak() internal function works correctly.
        (In the real game, this will not be called directly, but will as a subcall from infectCity() )
        When infected, if a city has 3 infections it will spread to connected neighbouring cities rather than itself.
        """
        # infect atlanta with 3 blues.
        # call cityOutBreak function on it ( requires obj and colour)
        # washington, miami, chicago should all be infected with ONE blue each. Atlanta should remain at 3.
        self.testGameBoard.cities = self.testGameBoard.generateCities()
        atlanta = self.testGameBoard.cities["ATLANTA"]
        miami = self.testGameBoard.cities["MIAMI"]
        chicago = self.testGameBoard.cities["CHICAGO"]
        washington = self.testGameBoard.cities["WASHINGTON"]
        atlanta.blue = 3
        self.testGameBoard.cityOutBreak(atlanta, 'blue')
        self.assertEquals(chicago.blue, 1)
        self.assertEquals(washington.blue, 1)
        self.assertEquals(atlanta.blue, 3)
        self.assertEquals(miami.blue, 1)

    def test_forcedOutBreakSafetyCheck(self):
        """
        A safecheck. If the city DOESNT actually have 3 infections on it, it should just do a normal infection.
        """
        # infect atlanta with !! 2 !! blues.
        # call cityOutBreak function on it ( requires obj and colour)
        # all connected cities should remain at zero infections. Atlanta should gain one infection.
        self.testGameBoard.cities = self.testGameBoard.generateCities()
        atlanta = self.testGameBoard.cities["ATLANTA"]
        miami = self.testGameBoard.cities["MIAMI"]
        chicago = self.testGameBoard.cities["CHICAGO"]
        washington = self.testGameBoard.cities["WASHINGTON"]
        atlanta.blue = 2
        self.testGameBoard.cityOutBreak(atlanta, 'blue')
        self.assertEquals(chicago.blue, 0)
        self.assertEquals(washington.blue, 0)
        self.assertEquals(atlanta.blue, 3)
        self.assertEquals(miami.blue, 0)

    def test_StandardOutBreak(self):
        """
        This test actually tests the process where the game will cause an outbreak from the coordinator.
        It uses the infectCity() function, which should cause an outbreak if a city has 3 infections on it.
        """
        # infect atlanta with 3 blues.
        # call infectCity function on it ( requires obj and colour)
        # washington, miami, chicago should all be infected with ONE blue each. Atlanta should remain at 3.
        self.testGameBoard.cities = self.testGameBoard.generateCities()
        atlanta = self.testGameBoard.cities["ATLANTA"]
        miami = self.testGameBoard.cities["MIAMI"]
        chicago = self.testGameBoard.cities["CHICAGO"]
        washington = self.testGameBoard.cities["WASHINGTON"]
        atlanta.blue = 3
        self.testGameBoard.infectCity("ATLANTA", 'blue')
        self.assertEquals(chicago.blue, 1)
        self.assertEquals(washington.blue, 1)
        self.assertEquals(miami.blue, 1)
        self.assertEquals(atlanta.blue, 3)

    def test_StandardOutBreak2(self):
        """
        Tests a different part of the map, with red infections.
        """
        # infect sydney with 3 reds
        # call infectCity function on it ( requires obj and colour)
        # jakarta, manila, losangeles should be infected with 1 red token each. Sydney should remain at 3.
        self.testGameBoard.cities = self.testGameBoard.generateCities()
        sydney = self.testGameBoard.cities["SYDNEY"]
        jakarta = self.testGameBoard.cities["JAKARTA"]
        manila = self.testGameBoard.cities["MANILA"]
        losangeles = self.testGameBoard.cities["LOSANGELES"]
        sydney.red = 3
        self.testGameBoard.infectCity("SYDNEY", amount=1)
        self.assertEquals(jakarta.red, 1)
        self.assertEquals(manila.red, 1)
        self.assertEquals(losangeles.red, 1)
        self.assertEquals(sydney.red, 3)

    def test_StandardOutBreak3(self):
        """
        Tests a different part of the map, with black infections.
        """
        # infect BAGHDAD with 3 blacks.
        # ISTANBUL, CAIRO, RIYADH, KARACHI, TEHRAN should be infected with 1 black token each. BAGHDAD should remain at 3.
        self.testGameBoard.cities = self.testGameBoard.generateCities()
        baghdad = self.testGameBoard.cities["BAGHDAD"]
        istanbul = self.testGameBoard.cities["ISTANBUL"]
        cairo = self.testGameBoard.cities["CAIRO"]
        riyadh = self.testGameBoard.cities["RIYADH"]
        karachi = self.testGameBoard.cities["KARACHI"]
        tehran = self.testGameBoard.cities["TEHRAN"]
        baghdad.black = 3
        self.testGameBoard.infectCity("BAGHDAD", amount=1)
        self.assertEquals(istanbul.black, 1)
        self.assertEquals(cairo.black, 1)
        self.assertEquals(riyadh.black, 1)
        self.assertEquals(karachi.black, 1)
        self.assertEquals(tehran.black, 1)
        self.assertEquals(baghdad.black, 3)

    def test_StandardOutBreak4(self):
        """
        Infects the black city with RED tokens. the connected cities Should NOT be infected with either black or red tokens.
        baghdad will remain at 3 reds, but go from 0 to 1 black. All connected cities should not have red OR blacks as no outbreak occured.
        """
        self.testGameBoard.cities = self.testGameBoard.generateCities()
        baghdad = self.testGameBoard.cities["BAGHDAD"]
        istanbul = self.testGameBoard.cities["ISTANBUL"]
        cairo = self.testGameBoard.cities["CAIRO"]
        riyadh = self.testGameBoard.cities["RIYADH"]
        karachi = self.testGameBoard.cities["KARACHI"]
        tehran = self.testGameBoard.cities["TEHRAN"]
        baghdad.red = 3
        self.testGameBoard.infectCity("BAGHDAD", amount=1)
        self.assertEquals(istanbul.black, 0)
        self.assertEquals(cairo.black, 0)
        self.assertEquals(riyadh.black, 0)
        self.assertEquals(karachi.black, 0)
        self.assertEquals(tehran.black, 0)
        self.assertEquals(istanbul.red, 0)
        self.assertEquals(cairo.red, 0)
        self.assertEquals(riyadh.red, 0)
        self.assertEquals(karachi.red, 0)
        self.assertEquals(tehran.red, 0)
        self.assertEquals(baghdad.red, 3)
        self.assertEquals(baghdad.black, 1)


    def test_2xchainOutBreak(self):
        """
        Chain outbreaks occur if a outbreak in a city causes another outbreak to occur (both cities get infected and both have
        3 tokens on them of the same colour)
        """
        # infect atlanta and washington with 3 tokens.
        # call infectCity on atlanta. both atlanta and washington should outbreak.
        # chicago, montreal, newyork should have 1 blue token each.
        # miami should have 2 blue tokens (one from each outbreak!)

        self.testGameBoard.cities = self.testGameBoard.generateCities()
        atlanta = self.testGameBoard.cities["ATLANTA"]
        washington = self.testGameBoard.cities["WASHINGTON"]
        miami = self.testGameBoard.cities["MIAMI"]
        chicago = self.testGameBoard.cities["CHICAGO"]
        newyork = self.testGameBoard.cities["NEWYORK"]
        montreal = self.testGameBoard.cities["MONTREAL"]

        atlanta.blue = 3
        washington.blue = 3
        self.testGameBoard.infectCity("ATLANTA", 'blue')
        self.assertEquals(chicago.blue, 1)
        self.assertEquals(newyork.blue, 1)
        self.assertEquals(montreal.blue, 1)
        self.assertEquals(miami.blue, 2)
        self.assertEquals(atlanta.blue, 3)
        self.assertEquals(washington.blue, 3)

    def test_3xchainOutBreak(self):
        """
        Chain outbreaks occur if a outbreak in a city causes another outbreak to occur (both cities get infected and both have
        3 tokens on them of the same colour)
        """
        # infect atlanta,washington,new york with 3 tokens.
        # call infectCity on atlanta. all 3 cities should outbreak.
        # 3 tokens: new york, washington, atlanta
        # 2 tokens: montreal, miami
        # 1 token: chicago, madrid, london

        self.testGameBoard.cities = self.testGameBoard.generateCities()
        atlanta = self.testGameBoard.cities["ATLANTA"]
        washington = self.testGameBoard.cities["WASHINGTON"]
        miami = self.testGameBoard.cities["MIAMI"]
        newyork = self.testGameBoard.cities["NEWYORK"]
        montreal = self.testGameBoard.cities["MONTREAL"]
        chicago = self.testGameBoard.cities["CHICAGO"]
        london = self.testGameBoard.cities["LONDON"]
        madrid = self.testGameBoard.cities["MADRID"]

        atlanta.blue = 3
        washington.blue = 3
        newyork.blue = 3
        
        self.testGameBoard.infectCity("ATLANTA", 'blue')
        self.assertEquals(london.blue, 1)
        self.assertEquals(madrid.blue, 1)
        self.assertEquals(chicago.blue, 1)
        self.assertEquals(montreal.blue, 2)
        self.assertEquals(miami.blue, 2)
        self.assertEquals(newyork.blue, 3)
        self.assertEquals(atlanta.blue, 3)
        self.assertEquals(washington.blue, 3)



    def test_processEpidemic(self):
        pass

    def test_resetPlayerActions(self):
        for k in self.testGameBoard.players:
            self.testGameBoard.players[k].actions=0
            self.testGameBoard.resetPlayerActions()
            self.assertEqual(self.testGameBoard.players[k].actions, 4)

    def test_endTurnDrawCards(self):
        # Each player should get 2 cards.
        self.testGameBoard.playerDeck = self.testGameBoard.generatePlayerDeck()
        self.testGameBoard.distributeHand()

        # get current number of cards in the hand.
        currentCards = len(self.testGameBoard.players[1].hand)
        # draw cards for all players.
        self.testGameBoard.endTurnDrawCards()
        #after turn ends two more cards are added to EACH player's hand
        for i in range(1,5):
            self.assertEqual(len(self.testGameBoard.players[i].hand), currentCards + 2)

    def test_endTurnInfectCities(self):
        """ This overwrites the current gameboard with a new one. The default initilization is applied.
            This is required as the game board has to be instantiated for the infections at the end of the round to work.
        """
        self.testGameBoard = GameBoard(self.players)
        for k in self.players:
            self.players[k].location = "" # need to clear roles, incase they interfere with initial infections.
        infections = self.testGameBoard.endTurnInfectCities()
        # make sure that infections are returning.
        self.assertNotEqual(infections, {})
        self.assertNotEqual(infections, [{}])

    def test_endTurnInfectCities2(self):
        """
        This checks that the amount of infections for the default difficulty is 4, and they contain the correct keys.
        """
        self.testGameBoard = GameBoard(self.players)
        #clear the player roles, as they may be messing with the infections!
        for k in self.players:
            self.players[k].location = ""
        infections = self.testGameBoard.endTurnInfectCities()[0] #TODO remove the [0] index once updated.
        # Can't check what the infections are because they are random. However can check that there is the right amount,
        # and that they contain the correct keys.
        print(infections)
        self.assertEqual(len(infections), 6) # base 6 infections for default difficulty.
        for i in infections:
            self.assertTrue('city' in i and 'colour' in i and 'amount' in i)

    def test_infectCity(self):
        self.testGameBoard.cities = self.testGameBoard.generateCities()
        testCity = self.testGameBoard.cities["WASHINGTON"]
        self.assertEqual(testCity.getInfections("blue"),0)
        self.testGameBoard.infectCity("WASHINGTON")
        self.assertEqual(testCity.getInfections("blue"),1)

class TestGameSpecialRoleActions(TestCase):
    def setUp(self):
        """ Create the gameBoard, add players """
        self.players = {1: Player(1, "p1"), 2: Player(2, "p2"), 3: Player(3, "p3"), 4: Player(4, "p4")}
        self.players[1].actions = 4
        self.testGameBoard = GameBoard(self.players, initialize = False)
        self.cities = self.testGameBoard.cities = self.testGameBoard.generateCities()
        self.testGameBoard.initialized = 1 # this sets the game to think it is initialized. This is required for the preventInfection checks


    def test_curedMedicMove(self):
        """ Tests that after the medic moves, and a cure if found for that city, it removes ALL tokens of that colour"""
        self.players[1].role = "medic"
        # # infect washington.
        washington = self.cities["WASHINGTON"]
        washington.blue = 3
        self.testGameBoard.cures["blue"] = 1
        # use the move function to move the medic to washington.
        self.testGameBoard.movePlayer(1, "WASHINGTON")
        self.assertEqual(washington.blue, 0)

    def test_curedMedicMoveFail(self):
        """ Tests that after the medic moves, and a cure IS NOT FOUND, the infections remain."""
        self.players[1].role = "medic"
        # # infect washington.
        washington = self.cities["WASHINGTON"]
        washington.blue = 3
        self.testGameBoard.cures["blue"] = 0
        # use the move function to move the medic to washington.
        self.testGameBoard.movePlayer(1, "WASHINGTON")
        self.assertEqual(washington.blue, 3)

    def test_curedMedicDirectFlight(self):
        """ Tests that after a direct flight, if the player is a medic and the cure is found, that city is cured."""
        miami = self.cities["MIAMI"]
        miami.yellow = 3
        self.players[1].role = "medic"
        self.testGameBoard.cures["yellow"] = 1
        card1 = PlayerCard("MIAMI","yellow","","","")
        # add card to the medics hand, and move them to a different city.
        self.testGameBoard.players[1].hand.append(card1)
        self.testGameBoard.players[1].location = "SEOUL"
        # directflight ( discard miami card)
        self.testGameBoard.directFlight(1, "MIAMI")
        self.assertTrue(self.testGameBoard.players[1].location, "MIAMI")
        self.assertEqual(miami.yellow, 0)


    def test_curedMedicCharterFlight(self):
        shanghai = self.cities["SHANGHAI"]
        shanghai.red = 3
        self.players[1].role = "medic"
        self.testGameBoard.cures["red"] = 1
        card1 = PlayerCard("ATLANTA", "blue", "", "", "")
        self.testGameBoard.players[1].hand.append(card1)
        self.testGameBoard.players[1].location = "ATLANTA"
        result = self.testGameBoard.charterFlight(1, "ATLANTA", "SHANGHAI")
        self.assertTrue(self.testGameBoard.players[1].location, "SHANGHAI")
        self.assertEqual(shanghai.red, 0)
        #check the JSON is as intended.
        self.assertTrue(result["validAction"])
        self.assertEqual(result["medicTreatments"], {'amount': 3, 'cityName': 'SHANGHAI', 'colour': 'red'})

    def test_curedMedicCharterFlightFail(self):
        """ Move the player to shanghai. No treatments should happen as a cure is not found"""
        shanghai = self.cities["SHANGHAI"]
        shanghai.red = 3
        self.players[1].role = "medic"
        # no cure this test. it shouldn't remove any tokens from shanghai
        card1 = PlayerCard("ATLANTA", "blue", "", "", "")
        self.testGameBoard.players[1].hand.append(card1)
        self.testGameBoard.players[1].location = "ATLANTA"
        result = self.testGameBoard.charterFlight(1, "ATLANTA", "SHANGHAI")
        self.assertTrue(self.testGameBoard.players[1].location, "SHANGHAI")
        self.assertNotEqual(shanghai.red, 0)
        # check the JSON is as intended.
        self.assertTrue(result["validAction"])
        self.assertEqual(result['medicTreatments'], {})


    def test_reseracherGive(self):
        """ The researcher should be able to give ANY card from their hand to a player on the same city"""
        card = PlayerCard("MIAMI", "yellow", "", "", "")
        self.testGameBoard.players[1].role = "researcher"
        self.players[1].hand.append(card)
        self.players[1].location = self.players[2].location ="ATLANTA"
        result = self.testGameBoard.shareKnowledgeGive(1,2,"MIAMI")
        self.assertTrue(card in self.players[2].hand)
        # this should use an action from the reseracher.
        self.assertEqual(self.players[1].actions, 3)
        # but the other player should have all actions remaining.
        self.assertEqual(self.players[2].actions, 4)
        # check the JSON is as intended
        self.assertTrue(result["validAction"])


    def test_reseracherGiveFail(self):
        """ This should fail because the player's aren't on the same city."""
        card = PlayerCard("MIAMI", "yellow", "", "", "")
        self.testGameBoard.players[1].role = "researcher"
        self.players[1].hand.append(card)
        self.players[1].location = "NEWYORK"
        self.players[2].location = "ATLANTA"
        result = self.testGameBoard.shareKnowledgeGive(1,2,"MIAMI")
        self.assertFalse(card in self.players[2].hand)
        self.assertFalse(result["validAction"])
        # the researcher should still have 4 actions.
        self.assertEqual(self.players[1].actions, 4)
        # check the JSON is as intended
        self.assertFalse(result["validAction"])

    def test_reseracherGiveFail2(self):
        """ This should fail because the player doesn't have the target card."""
        card = PlayerCard("SHANGHAI", "red", "", "", "")
        self.testGameBoard.players[1].role = "researcher"
        self.players[1].actions = 4
        self.players[1].hand.append(card)
        self.players[1].location = self.players[2].location ="ATLANTA"
        result = self.testGameBoard.shareKnowledgeGive(1,2,"MIAMI")
        self.assertFalse(result["validAction"])
        # all actions should remain.
        self.assertEqual(self.players[1].actions, 4)
        # check the JSON is as intended
        self.assertFalse(result["validAction"])

    def test_researcherTake(self):
        """ Another player should be able to take any card from the researchers hand, if they are on the same city."""
        self.players[1].role = "researcher"
        card = PlayerCard("CAIRO", "black", "", "", "")
        self.players[1].hand.append(card)
        self.players[1].location = self.players[2].location = "ATLANTA"
        result = self.testGameBoard.shareKnowledgeTake(2,1,"CAIRO")
        # check the JSON is as intended
        self.assertTrue(result["validAction"])

    def test_operationsBuild(self):
        self.players[1].role = "operationsExpert"
        self.players[1].location = "MEXICOCITY"
        result = self.testGameBoard.buildResearchStation(1, "MEXICOCITY")
        # this should use an action..
        self.assertEqual(self.players[1].actions,3)
        # check the JSON is as intended
        self.assertTrue(result["validAction"])

    def test_operationsBuild2(self):
        self.players[1].role = "operationsExpert"
        self.players[1].location = "MEXICOCITY"
        result = self.testGameBoard.buildResearchStation(1, "MEXICOCITY")
        # check the JSON is as intended
        self.assertTrue(result["validAction"])

    def test_operationsTeleport(self):
        """ On a research station, the operations expert can discard any city card to move to any city."""
        # place a research station in london. move player there.
        self.players[1].role = "operationsExpert"
        london = self.cities["LONDON"]
        london.researchStation = 1
        self.players[1].location = "LONDON"
        # add a player card to the user's hand.
        sydneyCard = PlayerCard("SYDNEY", "", "", "", "")
        self.players[1].hand.append(sydneyCard)
        result = self.testGameBoard.operationsTeleport(playerId=1, cardName="SYDNEY", destinationCity="CHENNAI")
        # the player should now be in chennai.
        self.assertEqual(self.players[1].location, "CHENNAI")
        # the card should be removed from the players hand
        self.assertTrue(sydneyCard not in self.players[1].hand)
        # the player should have used a move.
        self.assertEqual(self.players[1].actions, 3)
        # check the JSON is as intended
        self.assertTrue(result["validAction"])

    def test_operationsTeleportFail(self):
        """ The player is not set to be the operations expert. the action should fail."""
        # place a research station in london. move player there.
        london = self.cities["LONDON"]
        london.researchStation = 1
        self.players[1].location = "LONDON"
        # add a player card to the user's hand.
        sydneyCard = PlayerCard("SYDNEY", "", "", "", "")
        self.players[1].hand.append(sydneyCard)
        result = self.testGameBoard.operationsTeleport(playerId=1, cardName="SYDNEY", destinationCity="CHENNAI")
        # this should fail, the player isn't the operations expert.
        self.assertFalse(result['validAction'])

    def test_operationsTeleportFail2(self):
        """ If the player is not on a research station, it should fail."""
        # place a research station in london. move player there.
        self.players[1].role = "operationsExpert"
        london = self.cities["LONDON"]
        self.players[1].location = "LONDON"
        # add a player card to the user's hand.
        sydneyCard = PlayerCard("SYDNEY", "", "", "", "")
        self.players[1].hand.append(sydneyCard)
        result = self.testGameBoard.operationsTeleport(playerId=1, cardName="SYDNEY", destinationCity="CHENNAI")
        # the attempt should have failed.
        self.assertFalse(result['validAction'])

    def test_quarantinePreventInfect(self):
        """ when a city is infected, if the medic is on it and a cure for that colour has been found, then that city shouldn't be infected."""
        self.players[1].location = "SYDNEY"
        self.players[1].role = "quarantineSpecialist"
        self.testGameBoard.cures["red"] = 1
        self.testGameBoard.infectCity("SYDNEY", 2)
        self.assertEqual(self.cities["SYDNEY"].red, 0)

    def test_medicPreventInfect(self):
        """ when a city is infected, if the medic is on it and a cure for that colour has been found, then that city shouldn't be infected."""
        self.players[1].location = "SYDNEY"
        self.players[1].role = "medic"
        self.testGameBoard.cures["red"] = 1
        self.testGameBoard.infectCity("SYDNEY", 2)
        self.assertEqual(self.cities["SYDNEY"].red, 0)

    def test_dispatcherMoveOther(self):
        """
         When the dispatcher moves another player, the dispatcher should lose a move,
         and the target player should be moved to the new location.
         The dispatcher should stay at the current location.
         """
        player1 = self.testGameBoard.players[1]
        player2 = self.testGameBoard.players[2]
        # both players start in atlanta.

        # assign player 1 to be the dispatcher
        player1.role = "dispatcher"

        # use the dispatcher move to move player 2 to washington (connected to atlanta)
        result = self.testGameBoard.dispatcherMoveOther(1,2,"WASHINGTON")

        self.assertTrue(result['validAction'])
        self.assertEquals(player1.location, "ATLANTA")
        self.assertEquals(player2.location, "WASHINGTON")
        # player1 should have used a move
        self.assertEquals(player1.actions, 3)
        # player2 shouldn't have used a move.
        self.assertEquals(player2.actions, 4)

    def test_dispatcherMoveOtherFail(self):
        """
        This test checks moving another player fails if the target city is not connected to the target players current
        location.
         """
        player1 = self.testGameBoard.players[1]
        player2 = self.testGameBoard.players[2]
        # both players start in atlanta.

        # assign player 1 to be the dispatcher
        player1.role = "dispatcher"

        # use the dispatcher move to move player 2 to washington (connected to atlanta)
        result = self.testGameBoard.dispatcherMoveOther(1,2,"PARIS")

        # the result should fail.
        self.assertFalse(result['validAction'])
        # neither player should have moved location.
        self.assertEquals(player1.location, "ATLANTA")
        self.assertEquals(player2.location, "ATLANTA")
        # Neither player should have used an action.
        self.assertEquals(player1.actions, 4)
        self.assertEquals(player2.actions, 4)


    def test_dispatcherTeleportOther(self):
        """ The dispatcher can move (or 'teleport') a pawn to a city with another pawn as an action.
            This test checks that the dispatcher can move player 2 to player 3.
        """
        self.players[1].role = "dispatcher"
        self.players[2].location = "TOKYO"
        self.players[3].location = "CHENNAI"
        result = self.testGameBoard.dispatcherTeleportOther(1,2,"CHENNAI")
        # the 2nd player should now be in the location of the 3rd player.
        self.assertEqual(self.players[2].location, "CHENNAI")
        # the dispatcher should have used an action.
        self.players[1].actions = 3
        # check JSON
        self.assertTrue(result["validAction"])


    def test_dispatcherTeleportOther2(self):
        """ Checks that the dispatcher can move another player to themselves """
        self.players[1].role = "dispatcher"
        self.players[1].location = "SYDNEY"
        self.players[2].location = "LONDON"
        result = self.testGameBoard.dispatcherTeleportOther(1,2,"SYDNEY")
        # the 2nd player should now be in the location of the 3rd player.
        self.assertEqual(self.players[1].location, "SYDNEY")
        # the dispatcher should have used an action.
        self.players[1].actions = 3
        # check JSON
        self.assertTrue(result["validAction"])

    def test_dispatcherTeleportOther3(self):
        """ Checks that the dispatcher can move themselves to another player. """
        """ Checks that the dispatcher can move another player to themselves """
        self.players[1].role = "dispatcher"
        self.players[1].location = "SYDNEY"
        self.players[2].location = "LONDON"
        result = self.testGameBoard.dispatcherTeleportOther(1,1,"LONDON")
        # the 2nd player should now be in the location of the 3rd player.
        self.assertEqual(self.players[1].location, "LONDON")
        # the dispatcher should have used an action.
        self.players[1].actions = 3
        # check JSON
        self.assertTrue(result["validAction"])

    def test_dispatcherTeleportOtherFail(self):
        """ The dispatcher can move (or 'teleport') a pawn to a city with another pawn as an action.
            This test checks that the dispatcher can move player 2 to player 3.
        """
        self.players[1].role = "dispatcher"
        self.players[2].location = "TOKYO"
        self.players[3].location = "CHENNAI"
        result = self.testGameBoard.dispatcherTeleportOther(1,2,"NEWYORK")
        # the 2nd player should remain in TOKYO
        self.assertEqual(self.players[2].location, "TOKYO")
        # the dispatcher should have used no actions.
        self.players[1].actions = 4
        # check JSON
        self.assertFalse(result["validAction"])

    def test_scientistDiscoverCure(self):
        """
        The scientist only needs 4 cards of the same colour, while at a research station
        to discover a cure.
        """
        self.testGameBoard.players[1].location = "PARIS"
        self.testGameBoard.players[1].role = "scientist"
        self.testGameBoard.cities = self.testGameBoard.generateCities()
        paris = self.testGameBoard.cities['PARIS']
        paris.researchStation = 1
        cities = ["SANFRANCISCO", "CHICAGO", "MONTREAL", "NEWYORK"]
        for card in cities:
            pcard=PlayerCard(card, "blue", "", "", "")
            self.testGameBoard.players[1].hand.append(pcard)
        result = self.testGameBoard.discoverCure(1,cities)
        # player should have used a move
        self.assertEqual(self.testGameBoard.players[1].actions, 3)
        # should be a validAction.
        self.assertTrue(result["validAction"])

    def test_scientistDiscoverCureFail(self):
        """
        The scientist only needs 4 cards of the same colour, while at a research station
        to discover a cure.
        If they pass in 5 cards, it should return as an invalid action.
        """
        self.testGameBoard.players[1].location = "PARIS"
        self.testGameBoard.players[1].role = "scientist"
        self.testGameBoard.cities = self.testGameBoard.generateCities()
        paris = self.testGameBoard.cities['PARIS']
        paris.researchStation = 1
        cities = ["SANFRANCISCO", "CHICAGO", "MONTREAL", "NEWYORK", "LONDON"]
        for card in cities:
            pcard=PlayerCard(card, "blue", "", "", "")
            self.testGameBoard.players[1].hand.append(pcard)
        result = self.testGameBoard.discoverCure(1,cities)

        # player moves should remain the same.
        self.assertEqual(self.testGameBoard.players[1].actions, 4)
        # should be a validAction.
        self.assertFalse(result["validAction"])

    def test_scientistDiscoverCureFail2(self):
        """
        The scientist only needs 4 cards of the same colour, while at a research station
        to discover a cure.
        If they pass in 3 cards, it should return as an invalid action.
        """
        self.testGameBoard.players[1].location = "PARIS"
        self.testGameBoard.players[1].role = "scientist"
        self.testGameBoard.cities = self.testGameBoard.generateCities()
        paris = self.testGameBoard.cities['PARIS']
        paris.researchStation = 1
        cities = ["SANFRANCISCO", "CHICAGO", "MONTREAL"]
        for card in cities:
            pcard=PlayerCard(card, "blue", "", "", "")
            self.testGameBoard.players[1].hand.append(pcard)
        result = self.testGameBoard.discoverCure(1,cities)

        # player removes should remain the same.
        self.assertEqual(self.testGameBoard.players[1].actions, 4)
        # should be a validAction.
        self.assertFalse(result["validAction"])

    def test_medicCureDisease(self):
        """ The medic should cure all tiles on a city."""
        # generate requirements
        self.testGameBoard.cities = self.testGameBoard.generateCities()
        card = PlayerCard("MIAMI", "yellow", "", "", "")
        self.testGameBoard.players[1].location = "MIAMI"
        # infect atlanta
        miami = self.testGameBoard.cities['MIAMI']
        miami.yellow = 3
        result = self.testGameBoard.treatDisease(1,"MIAMI", colour="yellow")
        # Make sure the infection is removed from the object.
        self.assertEquals(miami.yellow, 0)
        # Make sure the action JSON returns True.
        self.assertEquals(result["validAction"], True)


class TestGameEventActions(TestCase):
    """ Event cards use no action. But they must be in a players hand to use it. It should be removed from their hand afterwards."""
    def setUp(self):
        """ Create the gameBoard, add players """
        self.players = {1: Player(1, "p1"), 2: Player(2, "p2"), 3: Player(3, "p3"), 4: Player(4, "p4")}
        self.players[1].actions = 4
        self.testGameBoard = GameBoard(self.players, initialize = False)
        self.cities = self.testGameBoard.cities = self.testGameBoard.generateCities()
        self.testGameBoard.initialized = 1 # this sets the game to think it is initialized. This is required for the preventInfection checks

    def test_governmentGrant(self):
        """ Government grants allows a research station to be placed on any city."""
        event_card = EventCard(1, "Government_Grant", "Government_Grant")
        self.players[1].hand.append(event_card)
        result = self.testGameBoard.governmentGrant(1, "Government_Grant", "SYDNEY")
        self.assertTrue(self.cities["SYDNEY"].researchStation)
        # check JSON is as expected.
        self.assertTrue(result["validAction"])

    def test_governmentGrant2(self):
        """ This should fail as the player doesn't have the card."""
        result = self.testGameBoard.governmentGrant(1, "Government_Grant", "SYDNEY")
        self.assertFalse(self.cities["SYDNEY"].researchStation)
        # check JSON is as expected.
        self.assertFalse(result["validAction"])

    def test_airLift(self):
        """ Air lift moves a player to any city."""
        event_card = EventCard(2, "Airlift", "Airlift")
        self.players[1].hand.append(event_card)
        result = self.testGameBoard.airLift(1,2,"MIAMI")
        self.assertTrue(self.players[2].location, "MIAMI")
        # check JSON is as expected.
        self.assertTrue(result["validAction"])

    def test_airLift2(self):
        """Checks if the player can move themselves with the card"""
        event_card = EventCard(2, "Airlift", "Airlift")
        self.players[1].hand.append(event_card)
        result = self.testGameBoard.airLift(1,1,"MIAMI")
        self.assertTrue(self.players[1].location, "MIAMI")
        # check JSON is as expected.
        self.assertTrue(result["validAction"])

    def test_airLiftFail(self):
        """ This should fail as the player doesn't have the card in their hand."""
        result = self.testGameBoard.airLift(1,2,"MIAMI")
        self.assertNotEqual(self.players[2].location, "MIAMI")
        # check JSON is as expected.
        self.assertFalse(result["validAction"])

    def test_skipInfectStage(self):
        """ When the skip cities card is played, the next infection round should be completely skipped."""
        event_card = EventCard(3, 'One_Quiet_Night', 'One_Quiet_Night')
        self.players[1].hand.append(event_card)
        # call the event card. this should change the board state.
        result = self.testGameBoard.skipInfectStage(1)
        # there state of skipInfectCities should be changed.
        self.assertEqual(self.testGameBoard.skipInfectCities,1)
        # it should also be a valid action.
        self.assertTrue(result["validAction"])
        # Now call end of turn's infect cities...
        result = self.testGameBoard.endTurnInfectCities()
        self.assertEqual(result, {})

class TestGameEndOfRound(TestCase):
    def setUp(self):
        pass

class TestGameUtils(TestCase):
    def setUp(self):
        """ Create the gameBoard, add players """
        self.players = {1: Player(1, "p1"), 2: Player(2, "p2"), 3: Player(3, "p3"), 4: Player(4, "p4")}
        self.players[1].actions = 4
        self.testGameBoard = GameBoard(self.players, initialize = False)


    def test_canInfectionBePrevented(self):
        """ When a player is a medic with a colour cured, they should prevent infections on that city for that colour."""
        self.testGameBoard.cities = self.testGameBoard.generateCities()
        miami = self.testGameBoard.cities["MIAMI"]
        self.players[1].location = "MIAMI"
        self.players[1].role = "medic"
        self.testGameBoard.cures["yellow"] = 1
        self.testGameBoard.initialized = 1 # the game must be initialized so the prevention works.
        result = self.testGameBoard.canInfectionBePrevented(miami, "yellow")
        self.assertTrue(result)

    def test_canInfectionBePrevented2(self):
        """ When a player is the quarantine specialist they should prevent infections on that city (and connected cities) for that colour.
            A cure does NOT need to be found.
        """
        self.testGameBoard.cities = self.testGameBoard.generateCities()
        miami = self.testGameBoard.cities["MIAMI"]
        self.players[1].location = "MIAMI"
        self.players[1].role = "quarantineSpecialist"
        self.testGameBoard.initialized = 1 # the game must be initialized so the prevention works.
        result = self.testGameBoard.canInfectionBePrevented(miami, "yellow")
        result2 = self.testGameBoard.canInfectionBePrevented(miami, "red")
        result3 = self.testGameBoard.canInfectionBePrevented(miami, "blue")
        result4 = self.testGameBoard.canInfectionBePrevented(miami, "black")
        self.assertTrue((result and result2 and result3 and result4))

    def test_canInfectionBePrevented3(self):
        """
        Tests that the quarantine specialist prevents surrounding infections.
        """
        self.testGameBoard.cities = self.testGameBoard.generateCities()
        miami = self.testGameBoard.cities["MIAMI"]
        self.players[1].location = "MIAMI"
        self.players[1].role = "quarantineSpecialist"
        self.testGameBoard.initialized = 1 # the game must be initialized so the prevention works.
        result = self.testGameBoard.canInfectionBePrevented(miami, "yellow")
        self.assertTrue(result)



class TestGameBoardMisc(TestCase):
    """ Testing for legacy / misc functions that don't fall into the categories above."""

    def setUp(self):
        """ Create the gameBoard, add players """
        d = {1: Player(1, "p1"), 2: Player(2, "p2"), 3: Player(3, "p3"), 4: Player(4, "p4")}
        self.testGameBoard = GameBoard(d, initialize = False)

    def test_totalPlayerActions(self):
        for k in self.testGameBoard.players:
            self.testGameBoard.players[k].actions = 0
        self.assertEqual(self.testGameBoard.totalPlayerActions(), 0)
        for k in self.testGameBoard.players:
            self.testGameBoard.players[k].actions = 2
        self.assertEqual(self.testGameBoard.totalPlayerActions(), 8)

if __name__ == '__main__':
    unittest.main()