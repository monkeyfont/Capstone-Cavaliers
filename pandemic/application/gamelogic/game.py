from random import shuffle, randint

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

    def getInfections(self, colour):
        """
        Returns the cities current infection count for a colour.
        """
        if colour == "blue":
            return self.blue
        elif colour == "yellow":
            return self.yellow
        elif colour == "red":
            return self.red
        elif colour == "black":
            return self.black

    def infect(self, colour, amount):
        """ 
        Infects the city with the coloured cube, and the amount specified.
        """
        if colour == "blue":
            self.blue += amount
        elif colour == "yellow":
            self.yellow += amount
        elif colour == "red":
            self.red += amount
        elif colour == "black":
            self.black += amount
    
    def treat(self, colour, amount):
        """ 
        treats a disease of colour by the amount specified. If the amount is too much, it clamps color to 0.
        """
        if colour == "blue":
            if self.blue==0:
                return False
            else:
                self.blue -= (amount if self.blue-amount > 0 else self.blue)
                return True
        elif colour == "yellow":
            if self.yellow==0:
                return False
            self.yellow -= (amount if self.yellow - amount > 0 else self.yellow)
            return True
        elif colour == "red":
            if self.red==0:
                return False
            self.red -= (amount if self.red - amount > 0 else self.red)
            return True
        elif colour == "black":
            if self.black==0:
                return False
            self.black -= (amount if self.black - amount > 0 else self.black)
            return True

class Player:
    """ Player class def """
    def __init__(self, id, name = "Player"):
        self.id = id
        self.name = name
        self.role = 0
        self.hand = []
        self.location = "ATLANTA"
        self.host = 0
        self.actions = 4 # actions remaining for the turn.

class GameBoard:
    """ Game class definition """
    def __init__(self, playerDict):

        """ init def """
        self.infectionRates = [2,2,2,3,3,4,4] # how many infection cards are drawn at the end of every turn
        #just for now while testing the GameBoard init function
        self.cities = {}
        self.infectionDeck = []
        self.playerDeck = []
        self.infectionDiscarded = []
        self.playerDiscarded = []
        self.playerCount = 0
        self.players = playerDict # {id:playerObj}
        self.cubesUsed = {"blue":0, "red":0, "yellow":0, "black":0}
        self.maxCubeCount = 20 # maximum number of cubes for individual colours. (if all used, loss happens.)
        self.cures = {"blue" : 0, "red" : 0, "yellow" : 0, "black" : 0} # 0 = undiscovered, 1 = cured, 2 = eradicated. POTENTIALLY CHANGE TO STRINGS? makes more self documenting.
        self.outBreakLevel = 0
        self.maxOutBreakLevel = 9 # at this level, the game is over.
        self.infectionLevel = 0
        self.gameID = 0
        self.difficulty = 0  # easy 0, medium 1, hard 2.
        self.visibility = "private"  # TODO this should be lobby based instead of GameBoard obj.
        self.initialized = 0

        # start players at ATLANTA
        ## !!!!! just test with player 1 at the moment!
        # self.players[1].setLocation("ATLANTA")
        #self.cities["ATLANTA"].addResearchStation()
        # self.__infectCitiesStage()
        # self.__distributeHand()
        self.__initializeBoard()


    def __checkAction(self, playerId):
        """ 
        Check if player has too many cards (they must discard before being able to perform an action)
        Checks that the player has available moves left from their action counter.
            
        Returns:
            a dictionary {validAction:True/False,actionsCount:int,cardsCount:int}
        """
        result = {}
        result["errorMessage"] = []

        playerObj = self.players[playerId]

        # add card count of a players hand.
        result["cardsCount"] = cardsCount = len(playerObj.hand)

        # add actions of a player

        result["actionsCount"] = actionsCount = playerObj.actions

        # check if valid move.
        if cardsCount < 8 and actionsCount > 0:
            result["validAction"] = True
        else:
            result["validAction"] = False
            if cardsCount >= 8:
                result["errorMessage"].append("Too many cards")
            if actionsCount <= 0:
                result["errorMessage"].append("No actions remain")

        return result
            


    def __endOfRound(self):
        """ 
        function removes an action from the player for the round.
        If all actions for all players are gone, it will invoke the end of the round functions.
        It then checks all losing conditions, to see if the game has been lost.
        Returns: 
            if any player has moves left: False
            if all player moves used: a dictionary containing end of round key:value pairs.
        """
        result = {}

        # check for actions left
        actions = self.totalPlayerActions()
        #actions=0 #for testing
        if actions > 0:
            result["endRound"] =False
        else:
            result["gameLoss"] = False
            result["gameLossReason"] = []

            # end of round has occured.
            result["endRound"] = True

            # invoke draw cards step
            result["cardDraw"] = self.endTurnDrawCards()

            # append infection level
            result["infectionLevel"] = self.infectionLevel

            # check if out of cards during the draw stage.
            if result["cardDraw"]["outOfCards"] == True:
                result["gameLoss"] = True
                result["gameLossReason"].append("Out of player cards.")

            # invoke infect cities step
            result["infectedCities"] = self.endTurnInfectCities()

            # check if cubes of any colour have run out.
            for colour in self.cubesUsed:
                if self.cubesUsed[colour] > self.maxCubeCount:
                    result["gameLoss"] = True
                    result["gameLossReason"].append("Out of " + colour + " cubes")

            # add the current outbreak level
            result["outBreakLevel"] = self.outBreakLevel

            # check if outbreak meter is at max
            if self.outBreakLevel >= self.maxOutBreakLevel:
                result["gameLoss"] = True
                result["gameLossReason"].append("Outbreak level")
        return result


    def __setStartingLocation(self):
        for playerkey in self.players:
            playerObj=self.players[playerkey]
            playerObj.setLocation("ATLANTA")

    def __setRoles(self):
        roles=["contingencyPlanner","dispatcher","medic","operationsExpert","quarantineSpecialist","researcher","scientist"]
        shuffle(roles)
        for playerkey in self.players:
            playerObj=self.players[playerkey]
            playerObj.role=roles[0]
            roles.pop(0)

    def __initializeBoard(self):
        """ Function initializes the board, with starting states for cities, decks, hands and locations. """
        self.cities = self.generateCities() # {id : City}
        self.infectionDeck = self.generateInfectionDeck() # [InfectionCard]
        self.playerDeck = self.generatePlayerDeck() # [PlayerCard]
        # start players at ATLANTA
        ## !!!!! just test with player 1 at the moment!
        #self.players[1].location = ("ATLANTA")
        self.cities["ATLANTA"].researchStation = 1
        # just for testing on game page
        self.cities["SEOUL"].researchStation = 1
        self.infectCitiesStage()
        self.distributeHand()
        self.__setRoles()
        self.initialized = 1

    def addPlayer(self, playerObj):
        """
        Add a player object to the players dictionary.
        The key is the current playerCount.
        """
        self.playerCount += 1
        self.players[self.playerCount] = playerObj


    def generateCities(self):
        """ Function generates a dictionary that contains all cities, and links between them. """
        citiesDict = {}
        for k in CITIES_TEMPLATE:
            citiesDict[k] = City(k, CITIES_TEMPLATE[k]["connections"], CITIES_TEMPLATE[k]["colour"])
        return citiesDict

    def generatePlayerDeck(self):
        """ Returns a list containing player card objects. Epidemic cards are NOT added."""
        cards = []
        for k in PLAYER_CARDS: #name,colour,population,area,country
            cards.append(PlayerCard(k, PLAYER_CARDS[k]["colour"], PLAYER_CARDS[k]["population"], PLAYER_CARDS[k]["area"], PLAYER_CARDS[k]["country"]))
        return cards

    def generateInfectionDeck(self):
        """ Returns a list containing infection card objects """
        cards = []
        for k in INFECTION_CARDS: #id,name,country,colour
            cards.append(InfectionCard(k, INFECTION_CARDS[k]["colour"], INFECTION_CARDS[k]["country"]))
        return cards


    def distributeHand(self):
        """ """
        # determine the number of cards to deal
        # 2 players - 4 cards, 3 - 3, 4 - 2
        cardsPerPlayer = {1:6, 2:4, 3:3, 4:2}
        nPlayers = len(self.players)
        nCardsToDeal = cardsPerPlayer[nPlayers]
        shuffle(self.playerDeck)
        for id in self.players:
            playerHand = self.players[id].hand
            for i in range(nCardsToDeal):
                playerHand.append(self.playerDeck[0])
                self.playerDeck.remove(self.playerDeck[0])

    def infectCitiesStage(self):
        """ 
        Infect cities stage occurs during the initalization.
        The infection deck is shuffled, then  
            1. 3 cards are drawn, infected with 3 markers
            2. 3 cards are drawn, infected with 2 markers
            3. 3 cards are drawn, infected with 1 marker       
        These cards are then added to the discard pile
         """
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
            cityObj.infect(colour, infectionAmount)
            print(cityName + " has been infected with " + str(infectionAmount) + " tokens")
            # discard the 9 infection cards.
        for i in range(9):
            self.infectionDiscarded.append(self.infectionDeck.pop(0))


    def placeEpidemicCards(self):
        """
        This should only be called after cards are dealt to players.
        Function created and places epidemic card objects into the deck.
        The amount added to the deck depends on difficulty of the game.
        easy (0) - 4 epidemic cards, medium(1) - 5 epidemics, hard(2) - 6 epidemics.
        The epidemics are randomly distributed into N "piles".
        It gets the valid range for each epidemic, then randomly places them.
        """
        # create the epidemic card objects
        amount = {0:4, 1:5, 2:6}
        numEpidemics = amount[self.difficulty]
        epidemics = []
        for i in range(numEpidemics):
            epidemics.append(EpidemicCard())
        # how many cards are in each pile?
        spread = int(len(self.playerDeck) / self.difficulty) # rounded down.
        #TODO - this could potentially miss the last card in the deck. Add logic in to deal with this.
        displaced = 0 # When adding a card in, the insert location will change by 1. Increase displaced by 1 for each epidemic added.
        for i in range(numEpidemics):
            location = randint(i*spread + displaced, (i+1)*spread + displaced)
            self.playerDeck.insert(epidemics.pop(i), location)
            displaced += 1

    def endTurnDrawCards(self):
        """
        function draw cards for all of the players in the game.
        """
        #TODO out of cards logic.
        cardDict={}
        #for i in range(len(self.playerDeck)): # for testing to get len of deck to 0
            #self.playerDeck.pop(0)

        if len(self.playerDeck)==0:# initial check
            cardDict["outOfCards"]=True
            return cardDict

        nCardsPerPlayer = 2 # n drawn for each player.
        for id in self.players:
            playerObj = self.players[id]
            for i in range(nCardsPerPlayer):
                # move the card from the player deck, to the players hand.
                if len(self.playerDeck) == 0:  # check after each time a card gets handed out
                    cardDict["outOfCards"] = True
                    return cardDict
                playerObj.hand.append(self.playerDeck.pop(0))
        # if you have made it to here then there are still cards left
        cardDict["outOfCards"] = False
        return cardDict




    def endTurnInfectCities(self):
        """
        Function draws infect city cards, and then infects those cities.
        The call to self.infectCity() handles infection and outbreak logic.
        The infect city card is added to the discard pile.
        """
        infectedCities = {}
        amountToDraw = 6 # TODO THIS NEEDS TO BE CHANGED WHEN WE DECIDE ON DRAW RATES FOR INFECTION LEVELS. (use a dict)
        for i in range(amountToDraw):
            # Draw the infection card from the top of the deck.
            infectCard = self.infectionDeck.pop(0)
            cityName = infectCard.name
            cityObject = self.cities[cityName]
            cityColour = cityObject.colour
            amount=1


            # infect the city. If an outbreak occurs, infectCity() handles it.
            self.infectCity(cityName)
            infectedCities[cityObject.name] = {cityColour: amount}
            # add the card to the discard pile
            self.infectionDiscarded.append(infectCard)
        return infectedCities


    def resetPlayerActions(self):
        """
        Resets all player object actions to 4.
        """
        for k in self.players:
            self.players[k].actions = 4
        return True


    def totalPlayerActions(self):
        """
        Returns the total of all player actions remaining.
        """
        total = 0
        for k in self.players:
            total += self.players[k].actions
        return total

    def checkWin(self):
        """ If all cures are discovered, victory!
            returns True/False
        """
        if self.cures["blue"] == 1 and self.cures["red"] == 1 and self.cures["yellow"] == 1 and self.cures["black"] == 1:
            return True
        else:
            return False


    def getAllCurrentInfectedCities(self):
        infectedCities={}
        for city in self.cities:
            cityObject=self.cities[city]
            cityColour=cityObject.colour
            amount=cityObject.getInfections(cityColour)
            if amount>0:
                infectedCities[cityObject.name]={cityColour:amount}

        return infectedCities

    def discardCard(self,playerId,cardToBeDiscarded):
        responseDict = {}
        playerObj = self.players[playerId]
        playerHand = playerObj.hand
        for card in playerHand:
            if(card.name == cardToBeDiscarded):
                playerHand.remove(card)
                self.playerDiscarded.append(card)
                return True

        return False

    def movePlayer(self, playerId, nextCityName):
        """
        card desc: Move to a connected city
        Move the player to the city that matches that cityID, only if they are connected.
        This sets the player object to that city, and the city object to know that the player is there.
        Returns: True if successful, False if unsuccessful.

        SPECIAL CASE - if player is the medic, and a cure has been discovered, every city the medic moves to will automatically be cured of infections for that
        cities colour.
        """

        responseDict={}

        validation = self.__checkAction(playerId)  # validate its a legal player move.
        if validation["validAction"] == False:
            return validation
        currentCityName = self.players[playerId].location
        cityObj = self.cities[currentCityName]
        playerObj = self.players[playerId]
        print playerObj.actions
        if nextCityName in cityObj.connections:
            self.players[playerId].location = nextCityName
            print("PlayerID " + str(playerId) + " has successfully moved to " + nextCityName)
            responseDict["validAction"] = True
            # special case if the player is the medic:
            if playerObj.role == "medic":
                colour = cityObj.colour
                if self.cures[color]: # if a cure has been discovered, treat all diseases of that colour on that city.
                    cityObj.treatDisease(colour, 3)
            playerObj.actions -= 1
            #print playerObj.actions
            endOfGameCheck = self.__endOfRound()
            #print endOfGameCheck
            responseDict.update(endOfGameCheck)
            return responseDict
        else:
            print("PlayerID " + str(playerId) + " FAILED to move to move from  " + currentCityName + " to " + nextCityName)
            responseDict["validAction"]=False
            responseDict["errorMessage"]="ERROR: This city is not connected to your current city"
            return responseDict


    def directFlight(self,playerId,nextCityName):
        """ Discard a city card to move to the city named on the card """
        responseDict = {}
        validation = self.__checkAction(playerId)  # validate its a legal player move.
        if validation["validAction"] == False:
            return validation
        playerObj = self.players[playerId]
        playerHand = playerObj.hand
        currentLocation = playerObj.location
        for card in playerHand:
            if(card.name == nextCityName): #check that the card is in their hand if so set location
                playerObj.location = nextCityName
                playerHand.remove(card)
                self.playerDiscarded.append(card)
                playerObj.actions -= 1
                print("player has successfully moved from" + currentLocation + " to " + playerObj.location)
                responseDict["validAction"] = True
                endOfGameCheck = self.__endOfRound()
                responseDict.update(endOfGameCheck)
                return responseDict

        responseDict["validAction"] = False
        responseDict["errorMessage"] = "ERROR: You do not have this card in your hand"
        return responseDict


    def charterFlight(self,playerId,curCityCard,destinationCity):
        """ Discard the city card that matches the city you are in to move to any city """
        responseDict = {}
        validation = self.__checkAction(playerId)  # validate its a legal player move.
        if validation["validAction"] == False:
            return validation
        playerObj = self.players[playerId]
        playerHand = playerObj.hand
        currentLocation = playerObj.location
        if destinationCity not in self.cities:
            responseDict["errorMessage"] = "ERROR: the city you want to move to does not exist, check your spelling"
            responseDict["validAction"] = False
            return responseDict

        for card in playerHand:
            if(card.name == curCityCard):# if you have that card
                if (currentLocation == curCityCard): # if you are in the right location
                    #if the city card is where you are, set cur city to the destination
                    playerObj.location = destinationCity
                    playerHand.remove(card)
                    self.playerDiscarded.append(card)
                    playerObj.actions -= 1
                    print('player ' + str(playerId) + ' has successfully chartered flight from ' + currentLocation + ' to ' + destinationCity)
                    responseDict["validAction"] = True
                    endOfGameCheck = self.__endOfRound()
                    responseDict.update(endOfGameCheck)
                    return responseDict
                else:
                    responseDict["errorMessage"] = "ERROR: You are not in the right location. To do this action you must be in the city of the card you wish to play"
                    responseDict["validAction"] = False
                    return responseDict
            
        responseDict["errorMessage"] = "ERROR: You do not have this card in your hand"
        responseDict["validAction"] = False
        return responseDict


    def shuttleFlight(self,playerId,destinationCity):
        """ Move from a city with a research station to any other city that has a research station """
        responseDict = {}
        validation = self.__checkAction(playerId)  # validate its a legal player move.
        if validation["validAction"] == False:
            return validation
        playerObj = self.players[playerId]
        currentCityName = playerObj.location
        curCityObj = self.cities[currentCityName]
        destCityObj = self.cities[destinationCity]
        if (curCityObj.researchStation == 1 and destCityObj.researchStation == 1):
            self.players[playerId].location = destinationCity
            playerObj.actions -= 1
            print('player ' + str(playerId) + ' has successfully shuttleFlight\'d from ' + currentCityName + ' to ' + destinationCity)
            responseDict["validAction"] = True
            endOfGameCheck = self.__endOfRound()
            responseDict.update(endOfGameCheck)
            return responseDict
        else:
            responseDict["validAction"] = False
            if curCityObj.researchStation != 1:
                responseDict["errorMessage"] = "ERROR: The city you are in does not have a research station"
            else:
                responseDict["errorMessage"] = "ERROR: The city you want to move to does not have a research station"
            return responseDict



    def buildResearchStation(self, playerId, cityCardName):
        """ Discard the city card that matches the city you are in to place a research station there """
        responseDict = {}
        validation = self.__checkAction(playerId)  # validate its a legal player move.
        if validation["validAction"] == False:
            return validation
        playerObj = self.players[playerId]
        playerHand = playerObj.hand
        currentLocation = playerObj.location
        curCityObj = self.cities[currentLocation]
        for card in playerHand:
            if card.name == cityCardName:
                if cityCardName == currentLocation and curCityObj.researchStation == 0 :
                    # if the city card is where you are then create research station
                    curCityObj.researchStation = 1
                    playerHand.remove(card)
                    self.playerDiscarded.append(card)
                    playerObj.actions -= 1
                    print('player ' + str(playerId) + ' has successfully built a research station at ' + currentLocation)
                    responseDict["validAction"] = True
                    endOfGameCheck = self.__endOfRound()
                    responseDict.update(endOfGameCheck)
                    return responseDict
                else:
                    responseDict["validAction"] = False
                    if cityCardName != currentLocation:
                        responseDict["errorMessage"] = "ERROR: You are not on the city of the card you want to play"
                    else:
                        responseDict["errorMessage"] = "ERROR: The city you wish to build a research station on already has one"

                    return responseDict

        responseDict["errorMessage"] = "ERROR: You do not have this card in your hand"
        responseDict["validAction"] = False
        return responseDict


    def shareKnowledgeTake(self, playerId, targetPlayerId, targetCity):
        """ 
        Take the card that matches the city you are in from another player. Both players must be in that same city.

        playerId takes the city card from targetPlayerId if they have the card, and both players are in the same city.

        SPECIAL CASE - if targetPlayer is the RESEARCHER it skips the check to make sure the city name matches the card city name.
        """
        responseDict = {}
        validation = self.__checkAction(playerId)  # validate its a legal player move.
        if validation["validAction"] == False:
            return validation
        playerObj = self.players[playerId]
        targetPlayer = self.players[targetPlayerId]
        playerHand = playerObj.hand
        targetPlayerHand = targetPlayer.hand
        # Check both players are in the same city
        if playerObj.location != targetPlayer.location:
            responseDict["errorMessage"] = "ERROR: You are not on the same city as {}".format(targetPlayer.name)
            responseDict["validAction"] = False
            return responseDict
        # If targetPlayer has that city card, move it to players hand.
        for card in targetPlayerHand:
            if card.name == targetCity or targetPlayer.role == "researcher": # SPECIAL CASE: if target player is the researcher, skip the card name check.
                targetPlayerHand.remove(card)
                playerHand.append(card)
                playerObj.actions -= 1
                print('player ' + str(playerId) + ' used shareKnowledge (take) with ' + str(targetPlayerId) + ' for city ' + targetCity)
                responseDict["validAction"] = True
                endOfGameCheck = self.__endOfRound()
                responseDict.update(endOfGameCheck)
                return responseDict
        #fall through
        responseDict["errorMessage"] = "ERROR: {} does not have this card in their hand".format(targetPlayer.name)
        responseDict["validAction"] = False
        return responseDict
        #TODO - not sure if 'permission' logic should be added here, or elsewhere.


    def shareKnowledgeGive(self, playerId, targetPlayerId, targetCity):
        """ 
        Give the card that matches the city you are in to another player. Both players must be in that same city.

        if has the city card, playerId gives the city card to targetPlayerId. Both players must be in the same city.

        SPECIAL CASE - if the player is the RESEARCHER it skips the check to make sure the city name matches the card city name.
        """
        responseDict = {}
        validation = self.__checkAction(playerId)  # validate its a legal player move.
        if validation["validAction"] == False:
            return validation
        playerObj = self.players[playerId]
        targetPlayer = self.players[targetPlayerId]
        playerHand = playerObj.hand
        targetPlayerHand = targetPlayer.hand
        # Check both players are in the same city
        if playerObj.location != targetPlayer.location:
            responseDict["errorMessage"] = "ERROR: You are not on the same city as {}".format(targetPlayer.name)
            responseDict["validAction"] = False
            return responseDict
        # If player has that city card, move it to players hand.
        for card in playerHand:
            if card.name == targetCity or targetPlayer.role == "researcher": # SPECIAL CASE: if the player is the researcher, skip the card name check.
                playerHand.remove(card)
                targetPlayerHand.append(card)
                playerObj.actions -= 1
                print('player ' + str(playerId) + ' used shareKnowledge (give) with ' + str(targetPlayerId) + ' for city ' + targetCity)
                responseDict["validAction"] = True
                endOfGameCheck = self.__endOfRound()
                responseDict.update(endOfGameCheck)
                return responseDict
        #fall through
        responseDict["errorMessage"] = "ERROR: {} does not have this card in their hand".format(targetPlayer.name)
        responseDict["validAction"] = False
        return responseDict
        #TODO - not sure if 'permission' logic should be added here, or elsewhere.



    def isPlayerAtResearchStation(self, playerId):
        # Check the user is currently at a research station.
        playerObj = self.players[playerId]
        playerCityObj = self.cities[playerObj.location]
        if playerCityObj.researchStation == 1:
            return True
        else:
            return False

    def discoverCure(self,playerId,cities):
        """
        at any research station, discard 5 city cards of the same disease colour to cure that disease
        Returns a dictionary:
            result = {validAction:"false", reason:"notEnoughCards" }

        SPECIAL CASE: if player is the scientist, they only need 4 cards to discover a cure.
        """
        # TODO this code should probably be refactored.

        validation = self.__checkAction(playerId) #validate its a legal player move.
        if validation["validAction"] == False:
            return validation
        playerObj = self.players[playerId]
        # Check player is at a research station
        if self.isPlayerAtResearchStation(playerId) is False:
            return
        # Check there is 5 city cards. Or if the player is the scientist, that there are 4 cards.
        if playerObj.role == "scientist" and len(cities) != 4:
            return
        elif len(cities) != 5:
            return
        # retrieve city objects from strings.
        result = {} # holds the return dict.
        cityObjs = []
        colour = ""
        for cityStr in cities:
            cityObj = self.cities[cityStr]
            cityObjs.append(cityObj)

        # make sure all cards are cities of the same colour.
            if colour == "": # retrieve colour
                colour = cityObj.colour
            else:
                if cityObj.colour != colour:
                    return
        # we now know all cards are of the same colour, so remove them from the user's hand.
        for cityObj in cityObjs:
            for card in playerObj.hand:
                if card.name==cityObj.name:
                    playerObj.hand.remove(card)
        # add that colour cure to the game board
        self.cures[colour] = 1
        print('player ' + str(playerId) + ' has discovered a cure for : ' + colour)
        playerObj.actions -= 1

        return True


    def treatDisease(self, playerId, targetCity, colour, amount = 1):
        """
        Treats a certain coloured disease within a city. An amount is defaults to 1.
        Retrieve the city object, and call its treat() function.

        SPECIAL CASE: if the player's role is the medic, they will cure all infections on that city.

        """
        # TODO potentially need to see if a disease can actually be treated.
        responseDict = {}
        validation = self.__checkAction(playerId)  # validate its a legal player move.
        if validation["validAction"] == False:
            return validation
        # Get player object
        playerObj = self.players[playerId]
        # Retrieve cities colour
        cityObj = self.cities[targetCity]
        currentLocation = playerObj.location
        if currentLocation!=targetCity:
            responseDict["errorMessage"] = "ERROR: You are not on the city you wish to treat"
            responseDict["validAction"] = False
            return responseDict
        # special case - if the player is the medic, it should cure all infections on that city. (3 is the maximum.)
        amount = 3
        response=cityObj.treat(colour, amount)
        print('player ', playerId, ' successfully treated colour ', colour, ' for ', cityObj.name)
        if response:
            playerObj.actions -= 1
            responseDict["validAction"] = True
            endOfGameCheck = self.__endOfRound()
            responseDict.update(endOfGameCheck)
            return responseDict
        else:
            responseDict["errorMessage"] = "ERROR: This city can not be treated"
            responseDict["validAction"] = False
            return responseDict
        # TODO need to implement logic that checks if the disease is cured.





    def infectCity(self, targetCity):
        """
        Called by the game to infect a certain city.
        If the city already has 3 cubes of that colour, an outbreak will occur.
        NOTE: this function does NOT require a colour param. Cities can only be infected with a colour other than own
        by outbreaks.

        city infections can be prevented by medic/quarantine specialist powers. see canInfectionBePrevented().
        """

        cityObj = self.cities[targetCity]
        # get the color of the city, and see what will happen if it is infected
        colour = cityObj.colour
        amount = cityObj.getInfections(colour)

        if self.canInfectionBePrevented(cityObj, colour):
            return False

        if amount == 3:
            self.cityOutBreak(cityObj, colour)
        else:
            print (targetCity + " has been infected.")
            cityObj.infect(colour,1)
        return True


    def canInfectionBePrevented(self, targetCityObj, colour):
        """
        SPECIAL CASE function
        Function checks if the medic or quarantine specialist abilities can prevent the infection of a city.

        Medic: if the medic is on a city and the cure is found, that city can not be infected with colours of that city.
        Quarantine specialist: any city the specialist is in, or its connected cities cannot be infected.
        """
        # can only be prevented before board initalization
        if self.initialized == 1:
            # Check all players to see if they are a medic/quar role.
            for player in self.players:
                if player.role == "medic" and player.location == targetCityObj.name and self.cures[colour] == 1:
                    return True
                if player.role == "quarantineSpecialist":
                    # check if the player is present in the current city, or connected cities.
                    if player.location == targetCityObj.name or player.location in targetCityObj.connections:
                        return True
        return False




    def cityOutBreak(self, targetCityObj, colour):
        """
        Intended to be called when the city has 3 infections on it.
        It will spread its colour of infection cubes to neighbouring cities.
        It will return a list of the cities infected, in order of infection.
        If another outbreak occurs, it will recursively call this function again.

        Any city in the outBreakChain cannot be called twice.
        Quarantine specialist/medic powers can prevent infection. see canInfectionBePrevented()
        """
        print (" AN OUTBREAK HAS OCCURED AT " + targetCityObj.name)
        citiesToInfect = [targetCityObj]
        cityOutBreaks = []
        while len(citiesToInfect) > 0:
            city = citiesToInfect.pop(0) # take the first city. (removes from list)
            amount = city.getInfections(colour)
            if amount < 3:
                # check if the infection is blocked by specialist abilities.
                if self.canInfectionBePrevented(city, colour) == False:
                    city.infect(colour, 1)
            else:
                # another outbreak has occured.
                # need to infect all of its neighbours.
                self.outBreakLevel += 1
                if city not in cityOutBreaks: # can't outbreak the same city more than once.
                    cityOutBreaks.append(city)
                    # retrieve neighbouring city objects and append to citiesToInfect
                    for cityStr in city.connections:
                        citiesToInfect.append(self.cities[cityStr])


    #############################################################################################
    ############                        Specialist Moves                           ##############


    #!!!!!!!!!! these functions are not being used anymore. their implementation has been moved to the generic functions.

    # # TODO -- need to decide if these should be special 'moves' sent from the frontend, or if the logic will be determined backend. 

    # ### Medic
    # def moveMedic(self, playerId, nextCityName):
    #     """ 
    #     When a medic moves, if a cure has been discovered it will cure all infections on that city of that cures colour. 
    #     This function calls the standard move action. If successful, and a cure is found, it will remove all infections on that city.

    #     Returns a python dictionary:
        
    #     {"validAction":bool, "errorMessage":str}
    #     """
    #     responseDict = {}
    #     # Check player is the medic
    #     playerObj = self.players[playerId]
    #     if playerObj.role != "medic":
    #         return {"validAction":False}

    #     # move medic to that city (this will remove an action.)
    #     moveResult = self.movePlayer(playerId, nextCityName)
    #     if moveResult["validAction"]:
    #         # Retrieve cities colour
    #         cityObj = self.cities[targetCity]
    #         colour = cityObj.colour
    #         # if a cure has been discovered for that colour, cure all cubes on that city.
    #         if self.cures[colour]:
    #             # treat all of that colour.
    #             cityObj.treatDisease(colour, 3)
    #     return moveResult


    # def treatMedic(playerId, targetCity, colour)
    # """
    #     When a medic treats a city, he treats all infections on that city for a colour.
    #     Calls self.treatDisease to treat the disease.

    #     Returns a python dictionry:

    #     {"validAction":bool, "errorMessage":str}
    # """
    # # Check player is the medic
    # playerObj = self.players[playerId]
    # if playerObj.role != "medic":
    #     return {"validAction":False}
    # resultDictionary = self.treatDisease(playerId, targetCity, colour, amount = 3)
    # return resultDictionary


    # ### researcher
    # def researcherGiveCards(self, playerId, targetPlayerId, targetCity):
    #     """
    #     Give a targetPlayer any city card. Both players must be in the same city.
    #     The card does not have to match the city.

    #     Returns a python dictionry:

    #     {"validAction":bool, "errorMessage":str}
    #     """

    #     #check the player is the researcher.
    #     playerObj = self.players[playerId]
    #     if playerObj.role != "researcher":
    #         return {"validAction":False}

    #     responseDict = {}
    #     validation = self.__checkAction(playerId)  # validate its a legal player move.
    #     if validation["validAction"] == False:
    #         return validation
    #     playerObj = self.players[playerId]
    #     targetPlayer = self.players[targetPlayerId]
    #     playerHand = playerObj.hand
    #     targetPlayerHand = targetPlayer.hand
    #     # If player has that city card, move it to players hand.
    #     for card in playerHand:
    #         if card.name == targetCity:
    #             playerHand.remove(card)
    #             targetPlayerHand.append(card)
    #             playerObj.actions -= 1 # use one of the player's actions.
    #             print('player ' + str(playerId) + ' used shareKnowledge (give) with ' + str(targetPlayerId) + ' for city ' + targetCity)
    #             responseDict["validAction"] = True
    #             endOfGameCheck = self.__endOfRound()
    #             responseDict.update(endOfGameCheck)
    #             return responseDict
    #     #fall through
    #     responseDict["errorMessage"] = "ERROR: {} does not have this card in their hand".format(targetPlayer.name)
    #     responseDict["validAction"] = False
    #     return responseDict


    








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
class EpidemicCard:
    """ Infection Card Definition """
    def __init__(self):
        self.name = "epidemic"
        self.type = "epidemic"


class InfectionCard:
    """ Infection Card Definition """
    def __init__(self, name, colour, country):
        self.name = name
        self.country = country
        self.colour = colour
        self.type = "infection"



