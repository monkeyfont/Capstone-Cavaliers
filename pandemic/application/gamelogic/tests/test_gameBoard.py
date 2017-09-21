from unittest import TestCase
from ..game import *

class TestGameBoard(TestCase):


    def setUp(self):
        """ Create the gameBoard, add players """

        d = {1: Player(1, "p1"), 2: Player(2, "p2"), 3: Player(3, "p3"), 4: Player(4, "p4")}
        self.testGameBoard = GameBoard(d)

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



    def test_infectCitiesStage(self):
        self.testGameBoard.cities = self.testGameBoard.generateCities()
        self.testGameBoard.infectionDeck=self.testGameBoard.generateInfectionDeck()

        self.testGameBoard.infectCitiesStage()
        # not sure how else to test this function as the cities that get infected are different every time
        self.assertEqual(self.testGameBoard.infectionDiscarded.__len__(),9)


    def test_placeEpidemicCards(self):
        self.fail()

    def test_endTurnDrawCards(self):
        self.testGameBoard.playerDeck = self.testGameBoard.generatePlayerDeck()
        self.testGameBoard.distributeHand()

        #players should have 4 cards in hand after initial deal
        for i in range(1,5):
            self.assertEqual(self.testGameBoard.players[i].hand.__len__(), 2)
        self.testGameBoard.endTurnDrawCards()
        #after turn ends two more cards are added to players hand
        for i in range(1,5):
            self.assertEqual(self.testGameBoard.players[i].hand.__len__(), 4)



    def test_endTurnInfectCities(self):
        self.fail()

    def test_resetPlayerActions(self):
        for k in self.testGameBoard.players:
            self.testGameBoard.players[k].actions=0
            self.testGameBoard.resetPlayerActions()
            self.assertEqual(self.testGameBoard.players[k].actions, 4)

    def test_totalPlayerActions(self):

        for k in self.testGameBoard.players:
            self.testGameBoard.players[k].actions = 0
        self.assertEqual(self.testGameBoard.totalPlayerActions(), 0)
        for k in self.testGameBoard.players:
            self.testGameBoard.players[k].actions = 2
        self.assertEqual(self.testGameBoard.totalPlayerActions(), 8)

    def test_movePlayer(self):

        self.testGameBoard.cities = self.testGameBoard.generateCities()
        # test from starting position
        self.assertEqual(self.testGameBoard.movePlayer(1,"WASHINGTON"), True)
        #test from a different position on board that should be able to move t
        self.testGameBoard.players[1].location="LONDON"
        #self.assertEqual(self.testGameBoard.movePlayer(1, "PARIS"), True)
        self.assertTrue(self.testGameBoard.movePlayer(1, "PARIS"))
        # should return false as SEOUL is not connected to PARIS
        self.assertFalse(self.testGameBoard.movePlayer(1, "SEOUL"))



    def test_directFlight(self):

        card1=PlayerCard("SANFRANCISCO","blue","","","")
        self.testGameBoard.players[1].hand.append(card1)
        self.testGameBoard.players[1].location = "SEOUL"
        # should assert true as player 1 has sanfran card in their deck
        self.assertTrue(self.testGameBoard.directFlight(1,"SANFRANCISCO"))
        # should return false as player does not have chicago card in their deck
        self.assertFalse(self.testGameBoard.directFlight(1, "CHICAGO"))



    def test_charterFlight(self):

        card1 = PlayerCard("SANFRANCISCO", "blue", "", "", "")
        self.testGameBoard.players[1].hand.append(card1)
        self.testGameBoard.players[1].location = "SANFRANCISCO"
        self.assertTrue(self.testGameBoard.charterFlight(1, "SANFRANCISCO","SHANGHAI"))



    def test_shuttleFlight(self):
        self.testGameBoard.cities = self.testGameBoard.generateCities()

        paris=self.testGameBoard.cities['PARIS']
        seoul=self.testGameBoard.cities['SEOUL']
        paris.researchStation=1
        seoul.researchStation=1
        self.testGameBoard.players[1].location = "PARIS"
        self.assertTrue(self.testGameBoard.shuttleFlight(1,"SEOUL"))
        self.assertEqual(self.testGameBoard.players[1].location,"SEOUL")
        seoul.researchStation = 0
        self.assertFalse(self.testGameBoard.shuttleFlight(1, "SEOUL"))


    def test_buildResearchStation(self):

        self.testGameBoard.cities = self.testGameBoard.generateCities()
        card1 = PlayerCard("SANFRANCISCO", "blue", "", "", "")
        self.testGameBoard.players[1].hand.append(card1)
        self.testGameBoard.players[1].location = "SANFRANCISCO"


        self.assertEqual(self.testGameBoard.cities["SANFRANCISCO"].researchStation, 0)
        self.assertTrue(self.testGameBoard.buildResearchStation(1,"SANFRANCISCO"))
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


    def test_treatDisease(self):
        self.fail()



    def test_infectCity(self):
        self.testGameBoard.cities = self.testGameBoard.generateCities()
        testCity = self.testGameBoard.cities["WASHINGTON"]
        self.assertEqual(testCity.getInfections("blue"),0)

        self.testGameBoard.infectCity("WASHINGTON")

        self.assertEqual(testCity.getInfections("blue"),1)


    def test_cityOutBreak(self):
        self.testGameBoard.cities = self.testGameBoard.generateCities()
        city=self.testGameBoard.cities["SYDNEY"]
        self.testGameBoard.cityOutBreak(city,city.colour)


