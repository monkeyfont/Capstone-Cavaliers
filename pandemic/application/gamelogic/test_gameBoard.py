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
        self.assertEqual(self.testGameBoard.generatePlayerDeck().__len__(), 48)

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
        print self.testGameBoard.difficulty
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

        self.assertTrue(self.testGameBoard.discoverCure(1,cities))

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
        card = PlayerCard("KOULKATA", "black", "", "", "")
        self.testGameBoard.players[1].location = "KOULKATA"
        # infect atlanta
        koulkata = self.testGameBoard.cities['KOULKATA']
        koulkata.black = 1
        result = self.testGameBoard.treatDisease(amount=1, colour="black", playerId=1, targetCity="KOULKATA")
        # Make sure the infection is removed from the object.
        self.assertEquals(koulkata.black, 0)
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
        pass

    def test_playerDiscardFail(self):
        pass



class TestGameCoordinator(TestCase):
    def setUp(self):
        """ Create the gameBoard, add players """
        d = {1: Player(1, "p1"), 2: Player(2, "p2"), 3: Player(3, "p3"), 4: Player(4, "p4")}
        self.testGameBoard = GameBoard(d, initialize = False)

    def test_outBreak(self):
        pass

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
        pass

    def test_infectCity(self):
        self.testGameBoard.cities = self.testGameBoard.generateCities()
        testCity = self.testGameBoard.cities["WASHINGTON"]
        self.assertEqual(testCity.getInfections("blue"),0)

        self.testGameBoard.infectCity("WASHINGTON")

        self.assertEqual(testCity.getInfections("blue"),1)

class TestGameSpecialRoleActions(TestCase):
    def setUp(self):
        pass

    def test_medicMoveAfterCure(self):
        pass

    def test_reseracherGive(self):
        pass

    def test_researcherTake(self):
        pass

    def test_operationsBuild(self):
        pass

    def test_operationsTeleport(self):
        pass

    def test_quarantinePreventInfect(self):
        pass

    def test_medicPreventInfect(self):
        pass

    def test_dispacterMoveOther(self):
        pass

    def test_dispatcherTeleportOther(self):
        pass

    def test_scientistDiscoverCure(self):
        pass

    def test_medicCureDisease(self):
        pass


class TestGameEventActions(TestCase):
    def setUp(self):
        pass

    def test_governmentGrant(self):
        pass

    def test_airLift(self):
        pass

    def test_skipInfectStage(self):
        pass

    def removeInfectionCard(self):
        pass

class TestGameEndOfRound(TestCase):
    def setUp(self):
        pass

class TestGameUtils(TestCase):
    def setUp(self):
        pass

    def isPlayerAtResearchStation(self):
        pass


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