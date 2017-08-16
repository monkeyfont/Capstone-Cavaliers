from random import shuffle

# temp cities dictionary. {CITYNAME* : {"colour" : string, "connections"[string]}}

CITIES_TEMPLATE = {
    "SANFRANCISCO":{"colour":"blue","connections":['TOKYO','MANILA','LOSANGELES','CHICAGO']},
    "CHICAGO":{"colour":"blue","connections":['SANFRANCISCO','LOSANGELES','MEXICOCITY','ATLANTA','MONTREAL']},
    "MONTREAL": {"colour": "blue", "connections": ['CHICAGO','WASHINGTON','NEWYORK']},
    "NEWYORK": {"colour": "blue", "connections": ['MONTREAL','WASHINGTON','MADRID','LONDON']},
    "ATLANTA": {"colour": "blue", "connections": ['CHICAGO','MIAMI','WASHINGTON']},
    "WASHINGTON": {"colour": "blue", "connections": ['MONTREAL','ATLANTA','MIAMI','NEWYORK']},
    "LONDON": {"colour": "blue", "connections": ['NEWYORK','MADRID','PARIS','ESSEN']},
    "ESSEN": {"colour": "blue", "connections": ['LONDON','PARIS','MILAN','STPETERSBURG']},
    "STPETERSBURG": {"colour": "blue", "connections": ['ESSEN','ISTANBUL','MOSCOW']},
    "MADRID": {"colour": "blue", "connections": ['NEWYORK','SAOPAULO','ALGIERS','PARIS','LONDON']},
    "PARIS": {"colour": "blue", "connections": ['LONDON','MADRID','ALGIERS','MILAN','ESSEN']},
    "MILAN": {"colour": "blue", "connections": ['ESSEN','PARIS','ISTANBUL']},
    "LOSANGELES": {"colour": "yellow", "connections": ['SANFRANCISCO','CHICAGO','MEXICOCITY','SYDNEY']},
    "MEXICOCITY": {"colour": "yellow", "connections": ['LOSANGELES','LIMA','BOGOTA','MIAMI','CHICAGO']},
    "MIAMI": {"colour": "yellow", "connections": ['ATLANTA','MEXICOCITY','BOGOTA','WASHINGTON']},
    "BOGOTA": {"colour": "yellow", "connections": ['MIAMI','MEXICOCITY','LIMA','BUENOSAIRES','SAOPAULO']},
    "LIMA": {"colour": "yellow", "connections": ['MEXICOCITY','SANTIAGO','BOGOTA']},
    "SANTIAGO": {"colour": "yellow", "connections": ['LIMA']},
    "BUENOSAIRES": {"colour": "yellow", "connections": ['BOGOTA','SAOPAULO']},
    "SAOPAULO": {"colour": "yellow", "connections": ['BOGOTA','BUENOSAIRES','LAGOS','MADRID']},
    "LAGOS": {"colour": "yellow", "connections": ['SAOPAULO','KINSHASA','KHARTOUM']},
    "KHARTOUM": {"colour": "yellow", "connections": ['LAGOS','JOHANNESBURG','CAIRO']},
    "KINSHASA": {"colour": "yellow", "connections": ['LAGOS','JOHANNESBURG','KHARTOUM']},
    "JOHANNESBURG": {"colour": "yellow", "connections": ['KINSHASA','KHARTOUM']},
    "SYDNEY": {"colour": "red", "connections": ['MANILA','JAKARTA','LOSANGELES']},
    "JAKARTA": {"colour": "red", "connections": ['SYDNEY','HOCHIMINCITY','BANGKOK','CHENNAI']},
    "MANILA": {"colour": "red", "connections": ['SYDNEY','SANFRANCISCO','HOCHIMINCITY','TAIPEI','HONGKONG']},
    "HOCHIMINCITY": {"colour": "red", "connections": ['MANILA','JAKARTA','BANGKOK','HONGKONG']},
    "BANGKOK": {"colour": "red", "connections": ['KOULKATA','HONGKONG','HOCHIMINCITY','JAKARTA','CHENNAI']},
    "TAIPEI": {"colour": "red", "connections": ['OSAKA','SHANGHAI','HONGKONG','MANILA']},
    "OSAKA": {"colour": "red", "connections": ['TOKYO','TAIPEI']},
    "TOKYO": {"colour": "red", "connections": ['SEOUL','OSAKA','SANFRANCISCO','SHANGHAI']},
    "HONGKONG": {"colour": "red", "connections": ['SHANGHAI','TAIPEI','MANILA','HOCHIMINCITY','BANGKOK','KOULKATA']},
    "SHANGHAI": {"colour": "red", "connections": ['BEIJING','SEOUL','TOKYO','TAIPEI','HONGKONG']},
    "SEOUL": {"colour": "red", "connections": ['TOKYO','SHANGHAI','BEIJING']},
    "BEIJING": {"colour": "red", "connections": ['SEOUL','SHANGHAI']},
    "KOULKATA": {"colour": "black", "connections": ['HONGKONG','BANGKOK','CHENNAI','DELHI']},
    "CHENNAI": {"colour": "black", "connections": ['DELHI','KOULKATA','BANGKOK','JAKARTA','MUMBAI']},
    "DELHI": {"colour": "black", "connections": ['KOULKATA','CHENNAI','MUMBAI','KARACHI','TEHRAN']},
    "MUMBAI": {"colour": "black", "connections": ['KARACHI','DELHI','CHENNAI']},
    "KARACHI": {"colour": "black", "connections": ['TEHRAN','DELHI','MUMBAI','RIYAOH','BAGHDAD']},
    "RIYAOH": {"colour": "black", "connections": ['BAGHDAD','KARACHI','CAIRO']},
    "TEHRAN": {"colour": "black", "connections": ['DELHI','KARACHI','BAGHDAD','MOSCOW']},
    "MOSCOW": {"colour": "black", "connections": ['TEHRAN','ISTANBUL','STPETERSBURG']},
    "BAGHDAD": {"colour": "black", "connections": ['TEHRAN','KARACHI','RIYAOH','CAIRO','ISTANBUL']},
    "CAIRO": {"colour": "black", "connections": ['ISTANBUL','BAGHDAD','RIYAOH','ALGIERS','KHARTOUM']},
    "ISTANBUL": {"colour": "black", "connections": ['STPETERSBURG','MOSCOW','BAGHDAD','CAIRO','ALGIERS','MILAN']},
    "ALGIERS": {"colour": "black", "connections": ['PARIS','ISTANBUL','CAIRO','MADRID']}
}
# CITY : {}
INFECTION_CARDS = {
    "SANFRANCISCO": {"colour": "blue", "country": ""},
    "CHICAGO": {"colour": "blue", "country": ""},
    "MONTREAL": {"colour": "blue", "country": ""},
    "NEWYORK": {"colour": "blue", "country": ""},
    "ATLANTA": {"colour": "blue", "country": ""},
    "WASHINGTON": {"colour": "blue", "country": ""},
    "LONDON": {"colour": "blue", "country": ""},
    "ESSEN": {"colour": "blue", "country": ""},
    "STPETERSBURG": {"colour": "blue", "country": ""},
    "MADRID": {"colour": "blue", "country": ""},
    "PARIS": {"colour": "blue", "country": ""},
    "MILAN": {"colour": "blue", "country": ""},
    "LOSANGELES": {"colour": "yellow", "country": ""},
    "MEXICOCITY": {"colour": "yellow", "country": ""},
    "MIAMI": {"colour": "yellow", "country": ""},
    "BOGOTA": {"colour": "yellow", "country": ""},
    "LIMA": {"colour": "yellow", "country": ""},
    "SANTIAGO": {"colour": "yellow", "country": ""},
    "BUENOSAIRES": {"colour": "yellow", "country": ""},
    "SAOPAULO": {"colour": "yellow", "country": ""},
    "LAGOS": {"colour": "yellow", "country": ""},
    "KHARTOUM": {"colour": "yellow", "country": ""},
    "KINSHASA": {"colour": "yellow", "country": ""},
    "JOHANNESBURG": {"colour": "yellow", "country": ""},
    "SYDNEY": {"colour": "red", "country": ""},
    "JAKARTA": {"colour": "red", "country": ""},
    "MANILA": {"colour": "red", "country": ""},
    "HOCHIMINCITY": {"colour": "red", "country": ""},
    "BANGKOK": {"colour": "red", "country": ""},
    "TAIPEI": {"colour": "red", "country": ""},
    "OSAKA": {"colour": "red", "country": ""},
    "TOKYO": {"colour": "red", "country": ""},
    "HONGKONG": {"colour": "red", "country": ""},
    "SHANGHAI": {"colour": "red", "country": ""},
    "SEOUL": {"colour": "red", "country": ""},
    "BEIJING": {"colour": "red", "country": ""},
    "KOULKATA": {"colour": "black", "country": ""},
    "CHENNAI": {"colour": "black", "country": ""},
    "DELHI": {"colour": "black", "country": ""},
    "MUMBAI": {"colour": "black", "country": ""},
    "KARACHI": {"colour": "black", "country": ""},
    "RIYAOH": {"colour": "black", "country": ""},
    "TEHRAN": {"colour": "black", "country": ""},
    "MOSCOW": {"colour": "black", "country": ""},
    "BAGHDAD": {"colour": "black", "country": ""},
    "CAIRO": {"colour": "black", "country": ""},
    "ISTANBUL": {"colour": "black", "country": ""},
    "ALGIERS": {"colour": "black", "country": ""}
}

PLAYER_CARDS = {
    "SANFRANCISCO":{"colour":"blue", "population":"", "area":"", "country": ""},
    "CHICAGO":{"colour":"blue", "population":"", "area":"", "country": ""},
    "MONTREAL":{"colour":"blue", "population":"", "area":"", "country": ""},
    "NEWYORK":{"colour":"blue", "population":"", "area":"", "country": ""},
    "ATLANTA":{"colour":"blue", "population":"", "area":"", "country": ""},
    "WASHINGTON":{"colour":"blue", "population":"", "area":"", "country": ""},
    "LONDON":{"colour":"blue", "population":"", "area":"", "country": ""},
    "ESSEN":{"colour":"blue", "population":"", "area":"", "country": ""},
    "STPETERSBURG":{"colour":"blue", "population":"", "area":"", "country": ""},
    "MADRID":{"colour":"blue", "population":"", "area":"", "country": ""},
    "PARIS":{"colour":"blue", "population":"", "area":"", "country": ""},
    "MILAN":{"colour":"blue", "population":"", "area":"", "country": ""},
    "LOSANGELES":{"colour":"yellow", "population":"", "area":"", "country": ""},
    "MEXICOCITY":{"colour":"yellow", "population":"", "area":"", "country": ""},
    "MIAMI":{"colour":"yellow", "population":"", "area":"", "country": ""},
    "BOGOTA":{"colour":"yellow", "population":"", "area":"", "country": ""},
    "LIMA":{"colour":"yellow", "population":"", "area":"", "country": ""},
    "SANTIAGO":{"colour":"yellow", "population":"", "area":"", "country": ""},
    "BUENOSAIRES":{"colour":"yellow", "population":"", "area":"", "country": ""},
    "SAOPAULO":{"colour":"yellow", "population":"", "area":"", "country": ""},
    "LAGOS":{"colour":"yellow", "population":"", "area":"", "country": ""},
    "KHARTOUM":{"colour":"yellow", "population":"", "area":"", "country": ""},
    "KINSHASA":{"colour":"yellow", "population":"", "area":"", "country": ""},
    "JOHANNESBURG":{"colour":"yellow", "population":"", "area":"", "country": ""},
    "SYDNEY":{"colour":"red", "population":"", "area":"", "country": ""},
    "JAKARTA":{"colour":"red", "population":"", "area":"", "country": ""},
    "MANILA":{"colour":"red", "population":"", "area":"", "country": ""},
    "HOCHIMINCITY":{"colour":"red", "population":"", "area":"", "country": ""},
    "BANGKOK":{"colour":"red","population":"", "area":"", "country": ""},
    "TAIPEI":{"colour":"red", "population":"", "area":"", "country": ""},
    "OSAKA":{"colour":"red", "population":"", "area":"", "country": ""},
    "TOKYO":{"colour":"red", "population":"", "area":"", "country": ""},
    "HONGKONG":{"colour":"red", "population":"", "area":"", "country": ""},
    "SHANGHAI":{"colour":"red", "population":"", "area":"", "country": ""},
    "SEOUL":{"colour":"red", "population":"", "area":"", "country": ""},
    "BEIJING":{"colour":"red", "population":"", "area":"", "country": ""},
    "KOULKATA":{"colour":"black", "population":"", "area":"", "country": ""},
    "CHENNAI":{"colour":"black", "population":"", "area":"", "country": ""},
    "DELHI":{"colour":"black", "population":"", "area":"", "country": ""},
    "MUMBAI":{"colour":"black", "population":"", "area":"", "country": ""},
    "KARACHI":{"colour":"black", "population":"", "area":"", "country": ""},
    "RIYAOH":{"colour":"black", "population":"", "area":"", "country": ""},
    "TEHRAN":{"colour":"black", "population":"", "area":"", "country": ""},
    "MOSCOW":{"colour":"black", "population":"", "area":"", "country": ""},
    "BAGHDAD":{"colour":"black", "population":"", "area":"", "country": ""},
    "CAIRO":{"colour":"black", "population":"", "area":"", "country": ""},
    "ISTANBUL":{"colour":"black", "population":"", "area":"", "country": ""},
    "ALGIERS": {"colour":"black", "population":"", "area":"", "country": ""}
}

EVENT_CARDS = {
    1:{"name":"Government Grant", "description":"Add 1 research station to any city ( no city card needed )"},
    2:{"name":"Airlift", "description":"Move any 1 pawn to any city, get permission before moving another player's pawn"},
    3: {"name": "testEvent", "description": "testEvent"},
    4: {"name": "testEvent", "description": "testEvent"},
    5: {"name": "testEvent", "description": "testEvent"},
    6: {"name": "testEvent", "description": "testEvent"}
}


class City:
    """ City class definition """
    def __init__(self, name, connections, colour):
        """ init def """
        self.name = name
        self.blue = 0
        self.black = 0
        self.red = 0
        self.yellow = 0
        self.researchStation = 0
        self.connections = connections # [string]
        self.colour = colour

    def addResearchStation(self):
        self.researchStation = 1

    def removeResearchStation(self):
        self.researchStation = 0

    def getResearchStation(self):
        return self.researchStation

    def getConnections(self):
        return self.connections

    def infectCity(self, colour, amount):
        # maybe return true if there is an outbreak? need to think about this ...
        if colour == "blue":
            self.blue += amount
        elif colour == "yellow":
            self.yellow += amount
        elif colour == "red":
            self.red += amount
        elif colour =="black":
            self.black += amount
    
    def cureCity(self, colour, amount):
        if colour == "blue":
            self.blue -= amount
        elif colour == "yellow":
            self.yellow -= amount
        elif colour == "red":
            self.red -= amount
        elif colour =="black":
            self.black -= amount

class Player:
    """ Player class def """
    def __init__(self, id, name = "Player"):
        self.id = id
        self.name = name
        self.role = 0
        self.hand = []
        self.location = "ATLANTA"
        self.host = 0

    def setLocation(self, location):
        self.location = location
    def getLocation(self):
        return self.location
    def getid(self):
        return self.id
    def setid(self,id):
        self.id = id


class GameBoard:
    """ Game class definition """
    def __init__(self):
        """ init def """
        self.infectionRates = [2,2,2,3,3,4,4] # how many infection cards are drawn at the end of every turn
        #just for now while testing the GameBoard init function
        self.cities = self.__generateCities() # {id : City}
        self.infectionDeck = self.__generateInfectionDeck() # [InfectionCard]
        self.playerDeck = self.__generatePlayerDeck() # [PlayerCard]
        self.infectionDiscarded = []
        self.playerDiscarded = []
        self.playerCount = 0
        self.players = {1:Player(1), 2:Player(2),3:Player(3), 4:Player(4)}
        self.blueUsed = 0 # disease cubes used
        self.redUsed = 0
        self.yellowUsed = 0
        self.blackUsed = 0
        self.yellowCure = 0
        self.redCure = 0 # 0 = undiscovered, 1 = cured, 2 = eradicated
        self.blueCure = 0
        self.blackCure = 0
        self.outBreakLevel = 0
        self.infectionLevel = 0
        self.gameID = 0

        # start players at ATLANTA
        ## !!!!! just test with player 1 at the moment!
        self.players[1].setLocation("ATLANTA")
        self.cities["ATLANTA"].addResearchStation()
        self.__infectCitiesStage()
        self.__distributeHand()


    def __generateCities(self):
        """ Function generates a dictionary that contains all cities, and links between them. """
        citiesDict = {}
        for k in CITIES_TEMPLATE:
            citiesDict[k] = City(k, CITIES_TEMPLATE[k]["connections"], CITIES_TEMPLATE[k]["colour"])
        return citiesDict

    def __generatePlayerDeck(self):
        """ Returns a list containing player card objects. Epidemic cards are NOT added."""
        cards = []
        for k in PLAYER_CARDS: #name,colour,population,area,country
            cards.append(PlayerCard(k, PLAYER_CARDS[k]["colour"], PLAYER_CARDS[k]["population"], PLAYER_CARDS[k]["area"], PLAYER_CARDS[k]["country"]))
        return cards

    def __generateInfectionDeck(self):
        """ Returns a list containing infection card objects """
        cards = []
        for k in INFECTION_CARDS: #id,name,country,colour
            cards.append(InfectionCard(k, INFECTION_CARDS[k]["colour"], INFECTION_CARDS[k]["country"]))
        return cards


    def __distributeHand(self):
        """ """
        shuffle(self.playerDeck)
        for id in self.players:
            playerhand = self.players[id].hand
            for i in range(3):
                playerhand.append(self.playerDeck[0])
                self.playerDeck.remove(self.playerDeck[0])
                print("Player id is",id,"cards are ",playerhand[i].name)





    def __infectCitiesStage(self):
        """ """
        # First shuffle the infection cards
        shuffle(self.infectionDeck)
        # draw first 3 cards, place 3 disease markers
        # draw the next 3 cards, place 2 disease markers
        # draw next 3 cards, place 1 disease marker.
        infectionAmount = 3
        for i in range(9):
            if i % 3 == 0 and i != 0: # this will happen on cards 3 and 6.
                infectionAmount -= 1 
            cityName = self.infectionDeck[i].name
            cityObj = self.cities[cityName] # get the city object with the key that matches card city name.
            colour = cityObj.colour
            cityObj.infectCity(colour, infectionAmount)
            print(cityName + " has been infected with " + str(infectionAmount) + " tokens")
        # discard the 9 infection cards.
        for i in range(9):
            self.infectionDiscarded.append(self.infectionDeck.pop(0))


    def __placeEpidemicCards(self):
        """ """
        pass

    def movePlayer(self, playerId, nextCityName):
        """
        card desc: Move to a connected city
        Move the player to the city that matches that cityID, only if they are connected.
        This sets the player object to that city, and the city object to know that the player is there.
        Returns: True if successful, False if unsuccessful.
        """
        currentCityName = self.players[playerId].getLocation()
        cityObj = self.cities[currentCityName]
        if nextCityName in cityObj.getConnections():
            self.players[playerId].setLocation(nextCityName)
            print("PlayerID " + str(playerId) + " has successfully moved to " + nextCityName)
            return True
        else:
            print("PlayerID " + str(playerId) + " FAILED to move to move from  "+currentCityName+" to " + nextCityName)
            return False


    def directFlight(self,playerId,nextCityName):
        """ Discard a city card to move to the city named on the card """

        playerhand = self.players[playerId].hand
        currentlocation=self.players[playerId].getLocation()
        for card in playerhand:

            if(card.name==nextCityName): #check that the card is in their hand if so set location
                self.players[playerId].setLocation(nextCityName)
                playerhand.remove(card)
                self.playerDiscarded.append(card)

                print "player has successfuly moved from",currentlocation," to",self.players[playerId].getLocation()
                return True

        return False



    def charterFlight(self,playerId,curCityCard,destinationCity):
        """ Discard the city card that matches the city you are in to move to any city """

        playerhand = self.players[playerId].hand
        currentLocation = self.players[playerId].getLocation()

        for card in playerhand:
            if(card.name==curCityCard and currentLocation==curCityCard):
                #if the city card is where you are, set cur city to the destination
                self.players[playerId].setLocation(destinationCity)
                playerhand.remove(card)
                self.playerDiscarded.append(card)
                return True

            else:

                return False


    def shuttleFlight(self,playerId,destinationCity):
        """ Move from a city with a research station to any other city that has a research station """
        currentCityName = self.players[playerId].getLocation()
        curCityObj = self.cities[currentCityName]
        destCityObj = self.cities[destinationCity]
        if (curCityObj.getResearchStation()==1 and destCityObj.getResearchStation()==1):
            self.players[playerId].setLocation(destinationCity)
            return True

        else:
            return False



    def buildResearchStation(self,playerId,cityCard):
        """ Discard the city card that matches the city you are in to place a research station there """

        playerhand = self.players[playerId].hand
        currentLocation = self.players[playerId].getLocation()
        curCityObj = self.cities[currentLocation]
        for card in playerhand:
            if card.name==cityCard:
                if cityCard == currentLocation and curCityObj.getResearchStation==0 :
                    # if the city card is where you are then create research station
                    curCityObj.addResearchStation()
                    playerhand.remove(card)
                    self.playerDiscarded.append(card)
                    return True
                else:
                    return False
        return False



    def shareKnowledge(self):
        """ Either: give the card that matches the city you are in to another player, or take that card from another player. Both players must be in the same city. """


    def discoverCure(self,playerId):
        """ at any research station, discard 5 city cards of the same disease colour to cure that disease """

        #not sure about this one so didnt do it all yet
        playerhand = self.players[playerId].hand
        blueCount=0
        for card in playerhand:
            if card.colour=="blue":
                blueCount+=1

        if blueCount >=5:
            self.blueCure=1


        # etc etc still need to implement rest of colours
#
#
#
class PlayerCard:
    """ Player City Card Definition """
    def __init__(self, name, colour, population, area, country):
        self.name = name
        self.population = population
        self.area = area
        self.colour = colour
        self.country = country
        self.type = "player"

#
# class EventCard:
#     """ Event Card Definition """
#     def __init__(self, id, name, description):
#         self.id = id
#         self.name = name
#         self.description = description
#         self.type = "event"
#
# class EpidemicCard:
#     """ Infection Card Definition """
#     def __init__(self, id, name, country, colouru):
#         self.id = id
#         self.name = name
#         self.country = country
#         self.colour = colour
#         self.type = "epidemic"
#
class InfectionCard:
    """ Infection Card Definition """
    def __init__(self, name, colour, country):
        self.name = name
        self.country = country
        self.colour = colour
        self.type = "infection"



