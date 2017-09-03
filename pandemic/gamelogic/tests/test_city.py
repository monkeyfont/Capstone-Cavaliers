from unittest import TestCase
from ..game import *

class TestCity(TestCase):

    def setUp(self):
        """ Create the city, add a colour, add the connections. """
        name = "SANFRANCISCO"
        colour = "blue"
        connections = ['TOKYO', 'MANILA', 'LOSANGELES', 'CHICAGO']
        self.testCity = City(name=name,colour=colour,connections=connections)

    def test_setUpName(self):
        """ check name is correctly set initialized"""
        self.assertEqual(self.testCity.name, "SANFRANCISCO")

    def test_setUpColour(self):
        """ check colour is correctly initialized """
        self.assertEqual(self.testCity.colour, "blue")

    def test_setUpConnections(self):
        """ Check the cities connection list is correctly initialized"""
        self.assertListEqual(self.testCity.connections, ['TOKYO', 'MANILA', 'LOSANGELES', 'CHICAGO'])

    def test_getInfections(self):
        """ Check getInfections returns zero for all colours, before anything is changed. """
        blue = self.testCity.getInfections("blue")
        yellow = self.testCity.getInfections("blue")
        black = self.testCity.getInfections("black")
        red = self.testCity.getInfections("red")
        self.assertSequenceEqual([blue,yellow,black,red], [0,0,0,0])

    def test_getInfections2(self):
        """ After setting an infection colour, check it returns the correct amount. """
        self.testCity.blue = 3
        self.assertEqual(self.testCity.getInfections("blue"), 3)

    def test_infectBlue(self):
        self.testCity.infect("blue", 1)
        self.assertEqual(self.testCity.blue, 1)

    def test_infectRed(self):
        """ infect should work for all colours, in any amount. """
        self.testCity.infect("red", 3)
        self.assertEqual(self.testCity.red, 3)

    def test_infectYellow(self):
        """ infect should work for all colours, in any amount. """
        self.testCity.infect("yellow", 3)
        self.assertEqual(self.testCity.yellow, 3)

    def test_infectBlack(self):
        """ infect should work for all colours, in any amount. """
        self.testCity.infect("black", 2)
        self.assertEqual(self.testCity.black, 2)

    def test_infectLarge(self):
        """ Should work for more than 3. (outbreak logic is determined elsewhere) """
        self.testCity.infect("black", 5)
        self.assertEqual(self.testCity.black, 5)

    def test_infectThenGetInfections(self):
        """ Both Infect and getInfections should be able to work together.  """
        self.testCity.infect("blue", 2)
        self.assertEqual(self.testCity.getInfections("blue"), 2)

    def test_treatBasic(self):
        """ add one to blue infection, treat for one. It should remove it. """
        self.testCity.blue = 1
        self.testCity.treat("blue", 1)
        self.assertEqual(self.testCity.blue, 0)

    def test_treatBasic2(self):
        """ A city with 2 infections, treated once should have one infect remaining """
        self.testCity.blue = 2
        self.testCity.treat("blue", 1)
        self.assertEqual(self.testCity.blue, 1)

    def test_treatLarge(self):
        """ A city with 3 infections, cured with a param of 3, should have none remaining."""
        self.testCity.blue = 3
        self.testCity.treat("blue", 3)
        self.assertEqual(self.testCity.blue, 0)

    def test_treatLarge2(self):
        """ A city with 3 infections, cured with a param of 1, should have 2 remaining"""
        self.testCity.blue = 3
        self.testCity.treat("blue", 1)
        self.assertEqual(self.testCity.blue, 2)

    def test_treatBlue(self):
        """ A city with 3 infections, cured with a param of 1, should have 2 remaining"""
        self.testCity.blue = 2
        self.testCity.treat("blue", 1)
        self.assertEqual(self.testCity.blue, 1)

    def test_treatRed(self):
        """ A city with 3 infections, cured with a param of 1, should have 2 remaining"""
        self.testCity.red = 3
        self.testCity.treat("red", 2)
        self.assertEqual(self.testCity.red, 1)

    def test_treatYellow(self):
        """ A city with 3 infections, cured with a param of 1, should have 2 remaining"""
        self.testCity.yellow = 2
        self.testCity.treat("yellow", 1)
        self.assertEqual(self.testCity.yellow, 1)

    def test_treatBlack(self):
        """ A city with 3 infections, cured with a param of 1, should have 2 remaining"""
        self.testCity.black = 2
        self.testCity.treat("black", 1)
        self.assertEqual(self.testCity.black, 1)

    def test_treatClampsToZero(self):
        """ Treating a city by more than it has infected, should result in zero infections. It cant be negative."""
        self.testCity.black = 2
        self.testCity.treat("black", 5)
        self.assertEqual(self.testCity.black, 0)

    def test_treatClampsToZero2(self):
        """ Treating a city by more than it has infected, should result in zero infections. It cant be negative."""
        self.testCity.treat("red", 5)
        self.assertEqual(self.testCity.red, 0)


