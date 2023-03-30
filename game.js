/*
 Antony Qin
 Aqua
 Sounds taken from freesound.org
*/


// game.js for Perlenspiel 3.2

/*
Perlenspiel is a scheme by Professor Moriarty (bmoriarty@wpi.edu).
Perlenspiel is Copyright © 2009-15 Worcester Polytechnic Institute.
This file is part of Perlenspiel.

Perlenspiel is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Perlenspiel is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Lesser General Public License for more details.

You may have received a copy of the GNU Lesser General Public License
along with Perlenspiel. If not, see <http://www.gnu.org/licenses/>.

Perlenspiel uses dygraphs (Copyright © 2009 by Dan Vanderkam) under the MIT License for data visualization.
See dygraphs License.txt, <http://dygraphs.com> and <http://opensource.org/licenses/MIT> for more information.
*/

// The following comment lines are for JSLint. Don't remove them!

/*jslint nomen: true, white: true */
/*global PS */

// This is a template for creating new Perlenspiel games

// All of the functions below MUST exist, or the engine will complain!

// PS.init( system, options )
// Initializes the game
// This function should normally begin with a call to PS.gridSize( x, y )
// where x and y are the desired initial dimensions of the grid
// [system] = an object containing engine and platform information; see documentation for details
// [options] = an object with optional parameters; see documentation for details
(function ()
{
	G =
	{
		//GLOBAL VARIABLES//

		width : 32,
		height : 32,
		fadeTimer : 5, // 60 divided by fadeTimer = FPS, 12 in this case
		currentLevel : 0, // Current level the player is in
		makingLevel : false, // Is the game currently constructing a level?
		baseColor : PS.COLOR_BLACK, // The color of the bead when no object is occupying the space
		dropCounter : 0, // Number of water balls the player threw
		objects : [], // The array that holds all the active objects during a level
		objectMap : // The primary "map" that the game reads from and displays
		[
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//0
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//1
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//2
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//3
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//4
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//5
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//6
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//7
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//8
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//9
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//10
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//11
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//12
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//13
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//14
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//15
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//16
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//17
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//18
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//19
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//20
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//21
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//22
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//23
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//24
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//25
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//26
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//27
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//28
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//29
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],//30
			[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null] //31
		],    //0     1     2     3     4     5     6     7     8     9    10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
		levelArray : [],// The array that holds all the levels of the game
		//MAP KEY :
			// null : nothing there
			// 1111 : player character
			// 2222 : wall
			// 3333 : fire
			// 4444 : ice
			// 5555 : goal
		level1 :
		[
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//0
			[2222, 2222, 2222, 2222, null, null, null, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//1
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//2
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//3
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, null, 2222, 2222, null, 2222, 2222, 2222],//4
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, null, null, null, null, null, 5555, 2222],//5
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, null, null, null, null, null, null, 5555, 2222],//6
			[2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, null, null, 2222, 2222, 2222, 2222, 2222],//7
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, null, null, null, null, null, 2222, null, 2222, 2222, 2222, 2222],//8
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, null, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//9
			[2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222],//10
			[2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//11
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//12
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, null, null, null, null, 2222, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//13
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, null, 2222, 2222, null, null, null, null, 2222, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//14
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, null, null, null, null, null, null, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222],//15
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, null, 2222, 2222, null, null, null, null, null, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222],//16
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, null, null, null, null, null, null, null, null, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222],//17
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, null, 2222, 2222, 2222, 2222, 2222],//18
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, null, null, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222],//19
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, null, null, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222],//20
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, null, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222],//21
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//22
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null],//23
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 1111, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null],//24
			[2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, null, null],//25
			[2222, 2222, 2222, 2222, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, null, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//26
			[2222, 2222, 2222, 2222, null, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//27
			[2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//28
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//29
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//30
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222] //31
		],    //0     1     2     3     4     5     6     7     8     9    10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
		level2 :
		[
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//0
			[2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//1
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//2
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//3
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//4
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//5
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//6
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222],//7
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//8
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222],//9
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222],//10
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222],//11
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222],//12
			[2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, null, 2222, 2222, null, null, null, null, null, null, null, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//13
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//14
			[2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, null, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//15
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, null, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//16
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, null, null, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//17
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, null, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//18
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, null, null, null, null, null, 5555, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//19
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, null, null, null, 3333, null, null, 5555, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//20
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 3333, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//21
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 3333, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//22
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 1111, 2222, 2222, 2222, 3333, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//23
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 3333, 3333, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//23
			[2222, 2222, 2222, null, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//24
			[2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//25
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, null, null, 2222, 2222, 2222, 2222],//26
			[2222, 2222, 2222, null, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222],//27
			[2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222],//28
			[2222, 2222, 2222, 2222, null, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//29
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//30
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222] //31
		],    //0     1     2     3     4     5     6     7     8     9    10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
		level3 :
		[
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//0
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//1
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//2
			[2222, 2222, 2222, 2222, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//3
			[2222, 2222, 2222, null, null, null, null, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//4
			[2222, 2222, 2222, 2222, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, null, null, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//5
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, null, 2222, 2222, null, 2222, 2222, 2222, null, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222],//6
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//7
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, null, 2222, 2222, null, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222],//8
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 4444, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//9
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//10
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//11
			[2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222],//12
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222],//13
			[2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, null, 2222, 2222, 2222, 2222],//14
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222],//15
			[null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, null, 2222, null, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222],//16
			[2222, null, 2222, 5555, null, null, null, null, null, null, 2222, null, null, null, null, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222],//17
			[2222, 2222, 2222, 5555, null, null, null, null, null, null, null, 3333, null, null, null, null, 1111, 4444, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//18
			[2222, 2222, null, 2222, 2222, 2222, 2222, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//19
			[2222, null, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//20
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//21
			[null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//22
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//23
			[2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//24
			[2222, null, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//25
			[null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//26
			[2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//27
			[2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//28
			[null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//29
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//30
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222] //31
		],    //0     1     2     3     4     5     6     7     8     9    10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
		level4 :
		[
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//0
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//1
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//2
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, null, null, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//3
			[2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, null, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//4
			[2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, null, 2222, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//5
			[2222, 2222, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, null, 2222, null, null, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//6
			[2222, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, null, null, 2222, null, null, 2222, 2222, 5555, 5555, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//7
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, null, null, null, null, null, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//8
			[2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, null, null, null, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, null, 2222, 2222, 2222, 2222, 2222, 2222],//9
			[2222, 2222, 2222, 2222, 2222, null, null, 2222, 2222, 2222, 2222, 2222, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//10
			[2222, 2222, 2222, 2222, 2222, 2222, null, null, 2222, 2222, 2222, 2222, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//11
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//12
			[2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//13
			[2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//14
			[2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, null, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//15
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222],//16
			[2222, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, null, null, 2222],//17
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, null, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, null, 2222, 2222, 2222],//18
			[2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, null, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//19
			[2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, null, null, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//20
			[2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, null, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//21
			[2222, 2222, null, 2222, 2222, 2222, null, 2222, null, 2222, null, null, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222],//22
			[2222, null, null, 2222, 2222, 2222, 2222, null, null, null, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//23
			[2222, 2222, null, 2222, 2222, 2222, 2222, null, null, null, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//24
			[2222, null, 2222, 2222, 2222, 2222, 2222, null, null, null, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//25
			[2222, 2222, null, 2222, 2222, 2222, 2222, 2222, null, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//26
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//27
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, null, null, null, null, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//28
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 1111, null, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//29
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 4444, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//30
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222] //31
		],    //0     1     2     3     4     5     6     7     8     9    10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
        level5 :
		[
			[2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222],//0
			[2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222],//1
			[2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222],//2
			[2222, 1111, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222],//3
			[2222, 2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222],//4
			[2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222],//5
			[2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222],//6
			[2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222],//7
			[2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222],//8
			[2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222],//9
			[2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222],//10
			[2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222],//11
			[2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222],//12
			[2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222],//13
			[2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222],//14
			[2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222],//15
			[2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222],//16
			[2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222],//17
			[2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222],//18
			[2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222],//19
			[2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222],//20
			[2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222],//21
			[2222, null, null, null, null, 2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222],//22
			[2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222],//23
			[2222, null, null, null, null, null, null, null, null, null, null, 2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222],//24
			[2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222],//25
			[2222, null, null, null, null, null, null, null, 2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222],//26
			[2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222, 2222],//27
			[2222, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222, null, null, null, null, null, 2222, null, null, null, null, null, null, null, null, null, null, 2222],//28
			[2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 5555],//29
			[2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222, null, null, null, null, null, null, null, null, null, null, null, null, null, 5555],//30
			[2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222, null, null, null, null, null, null, 4444, 2222] //31
		],    //0     1     2     3     4     5     6     7     8     9    10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
		level6 :
		[
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//0
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//1
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//2
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, null, null, 5555, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//3
			[2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, null, 5555, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//4
			[2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//5
			[2222, 2222, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, null, 2222, 2222, 2222, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//6
			[2222, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, null, null, 2222, null, null, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//7
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, null, null, null, null, null, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//8
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, null, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//9
			[2222, 2222, null, null, null, null, null, null, null, null, null, null, null, 4444, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//10
			[2222, null, null, null, null, null, null, null, null, null, null, null, null, 4444, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222],//11
			[2222, null, null, null, null, null, null, 2222, 2222, 2222, 2222, 2222, null, null, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222],//12
			[2222, null, null, null, null, null, null, 2222, 2222, 2222, 2222, 2222, null, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222],//13
			[2222, null, null, null, null, null, null, 2222, 2222, 2222, 2222, null, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222],//14
			[2222, null, null, null, null, null, null, null, null, null, 2222, null, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222],//15
			[2222, null, null, null, null, null, null, null, 2222, 2222, 2222, null, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, null, 2222],//16
			[2222, null, null, null, null, null, null, 2222, 2222, 2222, 2222, null, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, null, null, null, 2222],//17
			[2222, null, null, null, null, null, null, null, 2222, 2222, 2222, 2222, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, null, null, null, 2222, 2222, null, null, 2222, null, 2222],//18
			[2222, null, null, null, null, null, 2222, null, null, 2222, 2222, null, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, null, null, null, null, null, null, null, null, 2222, 2222, null, 2222],//19
			[2222, null, null, null, null, null, null, null, null, null, null, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, null, null, null, null, 2222, 2222, 2222, null, 2222],//20
			[2222, null, null, null, null, null, null, null, 2222, 2222, 2222, null, null, null, null, 2222, 2222, 2222, 2222, 2222, null, 2222, null, 2222, null, null, 2222, 2222, 2222, 2222, null, 2222],//21
			[2222, null, null, null, null, null, null, 2222, null, 2222, null, null, null, null, 2222, 2222, 2222, 2222, 2222, 2222, null, null, null, null, null, 2222, 2222, 2222, null, 2222, null, 2222],//22
			[2222, null, null, null, null, null, null, null, null, null, null, null, 2222, 2222, 2222, 2222, 2222, null, null, 2222, null, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222],//23
			[2222, null, null, null, null, null, 2222, null, null, null, 2222, null, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, null, null, null, 2222, 2222, null, null, null, 2222, 2222, null, 2222],//24
			[2222, null, null, null, null, null, null, null, null, null, null, null, 2222, 2222, 2222, 2222, 2222, null, null, null, null, null, 2222, null, null, null, 2222, null, 2222, 2222, null, 2222],//25
			[2222, null, null, null, null, null, 2222, 2222, null, null, null, 2222, null, 2222, 2222, 2222, null, null, null, null, null, 2222, null, null, null, 2222, null, null, null, 2222, null, 2222],//26
			[2222, null, null, null, null, null, null, 2222, null, null, null, null, null, null, null, 2222, null, null, null, null, null, null, 2222, null, 2222, 2222, 2222, null, null, null, null, 2222],//27
			[2222, null, 3333, null, 4444, 1111, null, null, null, null, null, null, null, 2222, null, null, null, 2222, 2222, 2222, null, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222],//28
			[2222, null, 2222, 2222, 2222, 2222, 2222, 2222, null, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, 2222, 2222, null, 2222],//29
			[2222, null, null, null, null, null, null, null, null, null, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 3333, 2222],//30
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222] //31
		],    //0     1     2     3     4     5     6     7     8     9    10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
		levelZero :
		[//whereArray represents the map, "00" stands for the origin, or click point, and the rest of the non-null indices symbolizes a potential explosion
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//0
			[2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222],//1
			[2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222],//2
			[2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222],//3
			[2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222],//4
			[2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222],//5
			[2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222],//6
			[2222, null, null, null, null, null, null, null, null, null, null, null, 2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222],//7
			[2222, null, null, null, null, null, null, null, null, null, null, 2222, 2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222],//8
			[2222, null, null, null, null, null, null, null, null, null, 2222, 2222, 2222, 2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222],//9
			[2222, null, null, null, null, null, null, null, null, 2222, 2222, 2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222],//10
			[2222, 3333, null, null, null, null, null, null, 2222, 5555, null, null, 4444, null, null, null, null, null, null, null, null, null, null, null, null, null, 3333, 3333, 3333, 3333, 3333, 2222],//11
			[2222, 2222, 3333, null, null, null, null, 2222, 2222, 5555, null, null, 4444, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//12
			[2222, 2222, 2222, 3333, null, null, 2222, 2222, 2222, 2222, 2222, null, 4444, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222],//13
			[2222, 2222, 2222, 2222, null, null, null, null, null, null, 2222, null, 4444, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222, 2222, 2222],//14
			[2222, 2222, 2222, 2222, null, 2222, null, null, null, null, 2222, null, 4444, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222, 2222],//15
			[2222, null, null, null, null, null, null, null, null, null, null, 2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222, 2222],//16
			[2222, 1111, null, null, 3333, null, null, null, null, null, null, null, null, 2222, null, 2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222, 2222],//17
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222, 2222],//18
			[2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222, null, null, null, null, null, null, null, null, null, null, null, 2222, 2222],//19
			[2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222, 2222],//20
			[2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222, 2222],//21
			[2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222, null, null, null, null, null, null, null, null, null, null, 2222, 2222],//22
			[2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222, 2222],//23
			[2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222, 2222],//24
			[2222, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2222, null, null, null, null, null, null, null, null, null, 2222, 2222],//25
			[2222, null, null, null, null, null, null, null, null, null, null, null, 3333, null, null, null, 3333, null, null, null, null, null, null, null, null, null, null, null, null, 2222, 2222, 2222],//26
			[2222, null, null, null, null, null, null, null, null, null, null, null, 2222, null, null, null, 2222, null, null, null, null, null, null, null, null, null, null, null, null, 2222, 2222, 2222],//27
			[2222, null, null, null, null, null, null, null, null, null, null, null, 2222, null, null, null, 2222, null, null, null, null, 2222, null, null, null, null, null, null, null, 2222, 2222, 2222],//28
			[2222, null, null, null, null, null, null, null, null, null, null, 2222, 2222, null, null, 2222, 2222, 2222, null, null, null, null, null, null, null, null, null, null, null, 2222, 2222, 2222],//29
			[2222, null, null, null, null, null, null, null, null, null, null, null, 2222, null, null, null, 2222, null, null, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222, 2222, null, 2222, 2222, 2222],//30
			[2222, 2222, 2222, 2222, 2222, 2222, 2222, 4444, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 2222, 3333, 2222, 2222, 2222] //31
		],    //0     1     2     3     4     5     6     7     8     9    10    11    12    13    14    15    16    17    18    19    20    21    22    23    24    25    26    27    28    29    30    31
		char :// The global variable that holds the important information of the player
		{
			x : null,
			y : null,
			inJump : false,
			facing : "right",
			airTime : 0, //Gives the player a little "hang-time" at the peak of a jump
			apex : 0, //Highest point of a jump
			handColor : PS.makeRGB(55, 151, 255), //A light bluish color
			inFrontOf : false
		},

		//OBJECT MAKING FUNCTIONS//

		makeObject : function(x, y) // A placeholder, an object that represents nothing is currently occupying a space on the map
		{
			var object =
			{
				x : x,
				y : y,
				name : "null",
				color : G.baseColor,
				property : null
			};
			PS.color(x, y, object.color);
			G.objectMap[x][y] = object; // Places the object into the main map
		},
		makeChar : function(x, y) // Creates an object that represents the player
		{
			var char =
			{
				x : x,
				y : y,
				name : "char",
				color : PS.COLOR_GREEN,
				property : "hard", // "hard" property means player canNOT move into it's space, and BLOCKS water
				facing : "right"
			};
		    //Colors the player bead green, then adds a border to the side where it's facing

			PS.color(x, y, char.color);
			PS.border(x, y, {top : 0, bot: 0, left: 0, right : 8});
			PS.borderColor(x, y, G.char.handColor);
			PS.borderAlpha(x, y, 255);

            // Updates the global player variable
			G.char.x = x;
            G.char.y = y;

			G.objectMap[x][y] = char; // Places the player into the main map

			G.objects.push(char); // Adds the player to the array that holds all active objects
		},
		makeWall : function(x, y) // Creates an object that represents a wall or floor
		{
			var wall =
			{
				x : x,
				y : y,
				name : "wall",
				color : PS.makeRGB(102, 51, 0), // A dark brown color
				property : "hard" // "hard" property means player canNOT move into it's space, and BLOCKS water
			};

			PS.color(x, y, wall.color);

			G.objectMap[x][y] = wall; // Places the wall/floor into the main map
		},
		makeDrop : function(x, y, force) // Creates an object that represents a water drop and gives it a directional velocity
		{
			var drop =
			{
				x : x,
				y : y,
				name : "drop",
				color : PS.COLOR_BLUE,
				property : "soft", // "soft" property means player CAN move into it's space
				force : force, // The direction the water drop is shooting
				warmth : 0 // This is to ensure that water doesn't immediately turn to ice again after it's been melted
			};

			PS.color(x, y, drop.color);

			G.objectMap[x][y] = drop; // Places the water drop into the main map

			G.objects.push(drop); // Adds the water drop to the array that holds all active objects
		},
		makeFire : function(x, y) // Creates an object that represents fire/magma/lava
		{
			var fire =
			{
				x : x,
				y : y,
				name : "fire",
				color : PS.COLOR_RED,
				property : "soft" // "soft" property means player CAN move into it's space
			}

			PS.color(x, y, fire.color);

			G.objectMap[x][y] = fire; // Places the fire into the main map

			G.objects.push(fire); // Adds the fire to the array that holds all active objects
		},
		makeSteam : function(x, y) // Creates an object that represents steam
		{
			var steam =
			{
				x : x,
				y : y,
				name : "steam",
				color : PS.makeRGB(211,211,211), //A whitish color
				fadeColor : PS.makeRGB(120, 120, 120), // A grayish color
				property : "soft", // "soft" property means player CAN move into it's space
				fade : false, // Works together with dissipate to give the steam TWO bounces off walls.
				dissipate : false,
				direction : 0 // Steam moves either left or right after hitting a ceiling
			}

			PS.color(x, y, steam.color);

			G.objectMap[x][y] = steam; // Places the steam into the main map

			G.objects.push(steam); // Adds the steam to the array that holds all active objects
		},
		makeIce : function(x, y) // Creates an object that represents ice
		{
			var ice =
			{
				x : x,
				y : y,
				name : "ice",
				color : PS.makeRGB(173,216,230), //A bluish-white color
				property : "hard" // "hard" property means player canNOT move into it's space, and BLOCKS water
			};

            if(G.makingLevel === false)
			{
                PS.fade(x, y, 60);
			}
			PS.color(x, y, ice.color);

			G.objectMap[x][y] = ice; // Places the ice into the main map

			G.objects.push(ice); // Adds the ice to the array that holds all active objects
		},
		makeExit : function(x, y) // Creates an object that represents the goal of the level
		{
			var exit =
			{
				x : x,
				y : y,
				name : "exit",
				color : PS.makeRGB(255,215,0), // A golden color
				property : "hard" // "hard" property means player canNOT move into it's space, and BLOCKS water
			}

			PS.color(x, y, exit.color);

			G.objectMap[x][y] = exit; // Places the goal into the main map
		}, //Walls and exits never MOVE or CHANGE, and as such, is not put into the objects array, holding all ACTIVE objects

        //ADJACENT CHECKING FUNCTIONS//

		amDrowning : function() // Checks if the player has no adjacent beads of "nothing" and at least one bead of water. (The player can't actually drown. This is just used to show the player that the player character can't swim.)
		{
			var origX = G.char.x;
			var origY = G.char.y;

			var upOne = origY - 1;
			var leftOne = origX - 1;
			var rightOne = origX + 1;

			var onWater = G.onWater(origX, origY);

			var amDrowned = false;

			if(onWater === true)
			{
				amDrowned = true;
			}

			if(!(upOne < 0) && G.objectMap[origX][upOne].name !== "null")
			{
				if((!(leftOne < 0)) && G.objectMap[leftOne][origY].name === "null")
				{
					amDrowned = false;
				}

				if((!(rightOne > G.width - 1)) && G.objectMap[rightOne][origY].name === "null")
				{
					amDrowned = false
				}
			}
			else
			{
				amDrowned = false;
			}

			return amDrowned;
		},
		onExit : function() // Checks if the player is adjacent to the exit, so that the player can progress
		{
			var origX = G.char.x;
			var origY = G.char.y;

			var upOne = origY - 1;
			var downOne = origY + 1;
			var leftOne = origX - 1;
			var rightOne = origX + 1;

			var onExit = false;

			if(!(upOne < 0) && G.objectMap[origX][upOne].name === "exit")
			{
				onExit = true;
			}
			else if(!(downOne > G.height - 1) && G.objectMap[origX][downOne].name === "exit")
			{
				onExit = true;
			}
			else if((!(leftOne < 0)) && G.objectMap[leftOne][origY].name === "exit")
			{
				onExit = true;
			}
			else if((!(rightOne > G.width - 1)) && G.objectMap[rightOne][origY].name === "exit")
			{
				onExit = true
			}

			return onExit;
		},
		onWater : function(x, y) // Checks if a particular bead is adjacent to water
		{
			var origX = x;
			var origY = y;

			var upOne = origY - 1;
			var downOne = origY + 1;
			var leftOne = origX - 1;
			var rightOne = origX + 1;

			var onWater = false;

			if(!(upOne < 0) && G.objectMap[origX][upOne].name === "drop")
			{
				onWater = true;
			}
			else if(!(downOne > G.height - 1) && G.objectMap[origX][downOne].name === "drop")
			{
				onWater = true;
			}
			else if((!(leftOne < 0)) && G.objectMap[leftOne][origY].name === "drop")
			{
				onWater = true;
			}
			else if((!(rightOne > G.width - 1)) && G.objectMap[rightOne][origY].name === "drop")
			{
				onWater = true
			}

			return onWater;
		},
		onFire : function(x, y) // Checks if a particular bead is adjacent to fire
		{
			var origX = x;
			var origY = y;

			var upOne = origY - 1;
			var downOne = origY + 1;
			var leftOne = origX - 1;
			var rightOne = origX + 1;

			var onFire = false;

			if(!(upOne < 0) && G.objectMap[origX][upOne].name === "fire")
			{
				onFire = true;
			}
			else if(!(downOne > G.height - 1) && G.objectMap[origX][downOne].name === "fire")
			{
				onFire = true;
			}
			else if((!(leftOne < 0)) && G.objectMap[leftOne][origY].name === "fire")
			{
				onFire = true;
			}
			else if((!(rightOne > G.width - 1)) && G.objectMap[rightOne][origY].name === "fire")
			{
				onFire = true
			}

			return onFire;
		},
		onIce : function(x, y) // Checks if a particular bead is adjacent to steam
		{
			var origX = x;
			var origY = y;

			var upOne = origY - 1;
			var downOne = origY + 1;
			var leftOne = origX - 1;
			var rightOne = origX + 1;

			var onIce = false;

			if(upOne >= 0 && G.objectMap[origX][upOne].name === "ice")
			{
				onIce = true;
			}
			else if(downOne <= G.height - 1 && G.objectMap[origX][downOne].name === "ice")
			{
				onIce = true;
			}
			else if(leftOne >= 0 && G.objectMap[leftOne][origY].name === "ice")
			{
				onIce = true;
			}
			else if(rightOne <= G.width - 1 && G.objectMap[rightOne][origY].name === "ice")
			{
				onIce = true
			}

			return onIce;
		},

        //PLAYER CHARACTER FUNCTIONS//

        turnChar : function(direction) // "turns" the player character by drawing a border on the side the player is facing
        {
            if(direction > 0)
            {
                G.char.facing = "right";
                PS.border(G.char.x, G.char.y, {top : 0, bot: 0, left: 0, right : 8});
                PS.borderColor(G.char.x, G.char.y, G.char.handColor);
            }
            else
            {
                G.char.facing = "left";
                PS.border(G.char.x, G.char.y, {top : 0, bot: 0, left: 8, right : 0});
                PS.borderColor(G.char.x, G.char.y, G.char.handColor);
            }
        },
        moveChar : function(direction) // moves the player character either one space to the LEFT, or one space to the RIGHT
        {
            var origX = G.char.x; // Original X position
            var origY = G.char.y; // Original Y position
            var newX = G.char.x + direction; // Tentative new X position

            if(direction > 0)
            {
                G.char.facing = "right";
            }
            else
            {
                G.char.facing = "left";
            }

            if(newX < 0 || newX > G.width - 1 || G.objectMap[newX][origY].property === "hard") // If tentative new position is out of bounds or occupied by something impassable
            {
                if(newX >= 0 && newX <= G.width - 1 && G.objectMap[newX][origY].name === "exit") // If tentative new position is occupied by EXIT bead, move to the next level
                {
                    if(G.currentLevel < G.levelArray.length - 1)
                    {
                        G.currentLevel += 1;
                        PS.audioPlay("fx_pop");
                        G.resetLevel();
                    }
                }
                else
                {
                    return;
                }
            }
            else
            {
                if(origY + 1 <= G.height - 1 && G.objectMap[origX][origY + 1].property === "hard") // is the player standing on something
                {
                    PS.audioPlay("step", {path : "audio/"});
                }

                if(G.objectMap[newX][origY].name === "fire") // If player moves into FIRE, reset the level
                {
                    PS.audioPlay("match", {path : "audio/"});
                    PS.audioPlay("fx_wilhelm", {volume : 0.2});
                    G.resetLevel();
                    return;
                }
                else if(G.objectMap[newX][origY].name === "steam") // If player moves into STEAM, kill the STEAM, and move the player into the space it once occupied
                {
                    G.makeObject(newX, origY);

                    G.switcheroo(origX, origY, newX, origY);
                    G.char.x = newX;

                    if(G.char.facing === "right") // turns the player right
                    {
                        PS.border(newX, origY, {top : 0, bot: 0, left: 0, right : 8});
                        PS.borderColor(newX, origY, G.char.handColor);
                    }
                    else // left
                    {
                        PS.border(newX, origY, {top : 0, bot: 0, left: 8, right : 0});
                        PS.borderColor(newX, origY, G.char.handColor);
                    }
                }
                else // If tentative new position isn't occupied by anything, move the player into that space
                {
                    G.switcheroo(origX, origY, newX, origY);
                    G.char.x = newX;

                    if(G.char.facing === "right") // turns the player right
                    {
                        PS.border(newX, origY, {top : 0, bot: 0, left: 0, right : 8});
                        PS.borderColor(newX, origY, G.char.handColor);
                    }
                    else // left
                    {
                        PS.border(newX, origY, {top : 0, bot: 0, left: 8, right : 0});
                        PS.borderColor(newX, origY, G.char.handColor);
                    }
                }
            }
        },
        jumpChar : function() // attempts to move the player up some spaces (a jump)
        {
            G.char.inJump = true;
            var origX = G.char.x; //Original X position
            var origY = G.char.y; // Original Y position

            var newY = G.char.y - 3; // New tentative maximum Y position (3 spaces up)
            var twoUp = G.char.y - 2; // (2 spaces up)
            var oneUp = G.char.y - 1; // (1 space up)

            if((origY + 1 <= G.height - 1 && G.objectMap[origX][origY + 1].property === "hard")) // If the bead directly under the player is within bounds and is occupied by something impassable (basically is the player standing on ground)
            {
                if (oneUp < 0 || G.objectMap[origX][oneUp].property === "hard") // If one space above the player is out of bounds or occupied by something impassable, cancel the jump
                {
                    G.char.inJump = false;
                    return;
                }
                else if (twoUp < 0 || G.objectMap[origX][twoUp].property === "hard") // If two spaces above the player is out of bounds or occupied by something impassable, jump one space
                {
                    PS.audioPlay("jump", {path : "audio/"});
                    G.char.apex = 1;
                    G.miniJump();
                }
                else if (newY < 0 || G.objectMap[origX][newY].property === "hard") // If three spaces above the player is out of bounds or occupied by something impassable, jump two spaces
                {
                    PS.audioPlay("jump", {path : "audio/"});
                    G.char.apex = 2;
                    G.miniJump();
                }
                else // If four or more spaces above the player is out of bounds or occupied by something impassable, jump three spaces
                {
                    PS.audioPlay("jump", {path : "audio/"});
                    G.char.apex = 3;
                    G.miniJump();
                }
            }
            else // The player isn't standing on something
            {
                G.char.inJump = false;
                return;
            }
        },
        miniJump : function() // attempts to move the player up one space
        {
            if(G.char.inJump === true)
            {
                var origX = G.char.x; // Original X position
                var origY = G.char.y; // Original Y position
                var newY = G.char.y - 1; // Tentative new Y position

                G.char.apex -= 1;

                if(newY < 0 || G.objectMap[origX][newY].property === "hard") // If one space above the player is out of bounds or occupied by something impassable, cancel the jump
                {
                    G.char.inJump = false;
                    return;
                }
                // otherwise move the player one space up
                G.switcheroo(origX, origY, origX, newY);
                G.char.y = newY;

                if(G.char.apex === 0) // reached the peak of jump
                {
                    G.char.airTime = 0;
                    G.char.inJump = false;
                }
                else // continue attempting to move the player up one space at a time
                {
                    window.setTimeout(G.miniJump, 50);
                }

                if(G.char.facing === "right") // turns the player right
                {
                    PS.border(origX, newY, {top : 0, bot: 0, left: 0, right : 8});
                    PS.borderColor(origX, newY, G.char.handColor);
                }
                else // left
                {
                    PS.border(origX, newY, {top : 0, bot: 0, left: 8, right : 0});
                    PS.borderColor(origX, newY, G.char.handColor);
                }
            }
        },
        gravityChar : function()
        {
            var origX = G.char.x; // Original X position
            var origY = G.char.y; // Original Y position

            var newY = origY + 1; // Tentative new Y position

            if(newY <= G.height - 1 && G.objectMap[origX][newY].name === "exit") // If tentative new position is occupied by EXIT bead, move to the next level
            {
                G.currentLevel += 1;
                PS.audioPlay("fx_pop");
                G.resetLevel();
            }
            else if(G.char.airTime === 3 && G.char.inJump === false) // After giving the player some hang time at the peak of their jump
            {
                if(G.objectMap[origX][newY].name === "fire") // Player falls into FIRE? Reset the level
                {
                    PS.audioPlay("match", {path : "audio/"});
                    PS.audioPlay("fx_wilhelm", {volume : 0.2});
                    G.resetLevel();
                }
                else if(G.objectMap[origX][newY].name === "steam") // Player falls into STEAM? Kill the STEAM and move player into its space
                {
                    G.makeObject(origX, newY);

                    G.switcheroo(origX, origY, origX, newY);
                    G.char.y = newY;

                    if(G.char.facing === "right") // turn the player right
                    {
                        PS.border(origX, newY, {top : 0, bot: 0, left: 0, right : 8});
                        PS.borderColor(origX, newY, G.char.handColor);
                    }
                    else // left
                    {
                        PS.border(origX, newY, {top : 0, bot: 0, left: 8, right : 0});
                        PS.borderColor(origX, newY, G.char.handColor);
                    }
                }
                else //Underneath the player is WATER or NOTHING? Move the player down
                {
                    G.switcheroo(origX, origY, origX, newY);
                    G.char.y = newY;

                    if (G.char.facing === "right")
                    {
                        PS.border(origX, newY, {top: 0, bot: 0, left: 0, right: 8});
                        PS.borderColor(origX, newY, G.char.handColor);
                    }
                    else
                    {
                        PS.border(origX, newY, {top: 0, bot: 0, left: 8, right: 0});
                        PS.borderColor(origX, newY, G.char.handColor);
                    }
                }

            }
            else if(G.char.inJump === false) // giving player some hang time at the peak of their jump
            {
                G.char.airTime += 1;
            }
        },

        //WATER DROPLET FUNCTIONS//

        gravityDrop : function(drop) // attempts to move water drop down a space
        {
            var origX = drop.x; // Original X position
            var origY = drop.y; // Original Y position
            var newY = drop.y + 1; // Tentative new Y position

            if(newY > G.height - 1 || G.objectMap[origX][newY].property === "hard") // If tentative new position is out of bounds or occupied by something impassable
            {
                if(newY > G.height - 1) // If tentative position is out of bounds, make the water drop disappear
                {
                    G.makeObject(origX, origY);
                }
                else if(G.objectMap[origX][newY].name === "ice") // If the tentative new position is occupied by ICE, turn the WATER into ICE
                {
                    if(drop.warmth < 0 && G.onFire(origX, origY) === false) // If the water drop is cold and not adjacent to fire
                    {
                        PS.audioPlay("ice", {path : "audio/", volume : 0.1});
                        G.makeIce(origX, origY);
                    }
                    else // cool the water drop
                    {
                        drop.warmth -= 1;
                    }
                }
            }
            else
            {
                if(G.objectMap[origX][newY].name === "fire") // if WATER encounters FIRE, kill WATER, and turn FIRE into STEAM
                {
                    PS.audioPlay("steam", {path : "audio/", volume : 0.3});
                    G.makeObject(origX, origY);
                    G.makeSteam(origX, newY);
                }
                else if(G.objectMap[origX][newY].name === "steam") // if WATER encounters STEAM, kill STEAM, and move water into STEAM's occupied space
                {
                    G.makeObject(origX, newY);
                    G.switcheroo(origX, origY, origX, newY);
                }
                else if(G.objectMap[origX][newY].name === "drop") // if WATER encounters WATER, attempt to pool WATER
                {
                    drop.force = 0; // stop the water from moving left or right
                    if(PS.random(101) > 50)
                    {
                        G.spreadDrop(origX, newY, origX, origY, true, false); // pool the water
                    }
                    else
                    {
                        G.spreadDrop(origX, newY, origX, origY, false, false); // pool the water
                    }
                }
                else // Nothing beneath water drop, so move it down
                {
                    G.switcheroo(origX, origY, origX, newY);
                }
            }
        },
        spreadDrop : function(dropX, dropY, origDropX, origDropY, isLeft, isDone) // attempts to pool the water drop
        {
            var origX = origDropX; // Original X position
            var origY = origDropY; // Original Y position
            var newX = dropX; // New X position
            var newY = dropY; // New Y position
            var goLeft = isLeft; // true means move drop left, false means move drop right
            var isDone = isDone; // has that side been swept before?

            if(isLeft === true)
            {
                newX = dropX - 1; // tentative new position is one to the left
            }
            else
            {
                newX = dropX + 1; // tentative new position is one to the right
            }

            if((newX < 0) || (newX > G.width - 1) || (G.objectMap[newX][newY].property === "hard")) // If the tentative new position encounters something impassable or tries to out of bounds
            {
                // Reverse the sweep, unless the side has already been swept before
                if(isDone === true)
                {
                    return;
                }
                else if(newX <= 0) // reached the end of sweepable left side, start sweeping right side
                {
                    newX = dropX + 1;
                    goLeft = false;
                    isDone = true;
                }
                else // reached the end of sweepable right side, start sweeping left side
                {
                    newX = dropX - 1;
                    goLeft = true;
                    isDone = true;
                }
            }

            if(G.objectMap[newX][newY].name === "drop" || G.objectMap[newX][newY].property === "hard") // If tentative new position goes out of bounds or encounters something impassable
            {
                if(isDone === true && ((newX <= 0 && goLeft === true) || (newX >= G.width - 1 && goLeft === false) || (G.objectMap[newX][newY].property === "hard"))) // If both side have been swept
                {
                    return;
                }
                else // continue the sweep
                {
                    G.spreadDrop(newX, newY, origX, origY, goLeft, isDone);
                }
            }
            else
            {
                if(G.objectMap[newX][newY].name === "fire") // If WATER encounters FIRE, kill WATER, and turn FIRE into STEAM
                {
                    PS.audioPlay("steam", {path : "audio/", volume : 0.3});
                    G.makeObject(origX, origY);
                    G.makeSteam(newX, newY);
                }
                else // Free space under the original drop and to the sides, move the drop there
                {
                    G.switcheroo(origX, origY, newX, newY);
                }
            }
        },
        moveDrop : function(drop) // attempts to move the drop to the left or right
        {
            var origX = drop.x; // Original X position
            var origY = drop.y; // Original Y position
            var newX = drop.x + drop.force; // Tentative new X position

            if(newX > G.width - 1 || newX < 0 || G.objectMap[newX][origY].property === "hard") // If tentative new position goes out of bounds or is occupied by something impassable
            {
                drop.force = 0; // stop the drop from moving to the sides

                if(newX <= G.width - 1 && newX >= 0 && G.objectMap[newX][origY].name === "ice") // If tentative new position is occupied by ICE
                {
                    if(drop.warmth < 0 && G.onFire(origX, origY) === false) // If WATER is cold and not adjacent to FIRE, turn WATER into ICE
                    {
                        PS.audioPlay("ice", {path : "audio/", volume : 0.1});
                        G.makeIce(origX, origY);
                    }
                    else // cool the water drop
                    {
                        drop.warmth -= 1;
                    }
                }

            }
            else
            {
                if(G.objectMap[newX][origY].name === "fire") // If WATER encounters FIRE, kill WATER, and turn FIRE into STEAM
                {
                    PS.audioPlay("steam", {path : "audio/", volume : 0.3});
                    G.makeObject(origX, origY);
                    G.makeSteam(newX, origY);
                }
                else if(G.objectMap[newX][origY].name === "steam") // If WATER encounters STEAM, kill STEAM, and move water to STEAM's occupied space
                {
                    G.makeObject(newX, origY);
                    G.switcheroo(origX, origY, newX, origY);
                }
                else
                {
                    if(G.objectMap[newX][origY].name === "drop") // If WATER encounters WATER, stop the WATER from moving to the sides
                    {
                        drop.force = 0;
                    }
                    G.switcheroo(origX, origY, newX, origY);
                }
            }
        },

		//STEAM FUNCTIONS//

		floatSteam : function(steam) // takes a steam object and attempts to move it up a space on the map
		{
			var origX = steam.x; // Original X position
			var origY = steam.y; // Original Y position
			var newY = origY - 1; // Tentative new Y position

			if(newY < 0 || G.objectMap[origX][newY].property === "hard") // If the tentative new position is out of bounds or impassable
			{
				if(newY >= 0 && G.objectMap[origX][newY].name === "ice") // If the tentative new position is ICE, remove the STEAM, and turn the ICE into WATER
				{
                    PS.audioPlay("steam", {path : "audio/", volume : 0.3});
					G.makeObject(origX, origY);
                    PS.fade(origX, newY, 60);
					G.makeDrop(origX, newY, 0);
					G.objectMap[origX][newY].warmth = 3; // This makes sure the new WATER doesn't turn back to ICE immediately
				}
				else
				{
					if(steam.fade === false)
					{
						if(origX - 1 >= 0 && origX + 1 <= G.width - 1 && G.objectMap[origX - 1][origY].property !== "hard" &&  G.objectMap[origX + 1][origY].property !== "hard") // Steam within bounds and has no walls to its sides
						{
							if((PS.random(101) - 1) > 50)
							{
								steam.direction = -1; // Go either LEFT
							}
							else
							{
								steam.direction = 1; // or RIGHT
							}
						}
						else if(origX - 1 < 0 || (origX - 1 >= 0 && G.objectMap[origX - 1][origY].property === "hard")) // If left side is impassable/out of bounds
						{
							steam.direction = 1; // move steam RIGHT
						}
						else if(origX + 1 > G.width - 1 || (origX + 1 <= G.width - 1 && G.objectMap[origX + 1][origY].property === "hard")) // If right side is impassable/out of bounds
						{
							steam.direction = -1; // move steam LEFT
						}

						steam.fade = true;
					}
					if(steam.dissipate === true)
					{
						G.makeObject(origX, origY);
					}
					else
					{
						steam.color = steam.fadeColor;
						G.moveSteam(G.objectMap[origX][origY]);
					}
					//FADE and DISSIPATE of steam, allows the steam to bounce off TWO walls before disappearing
				}
			}
			else
			{
				if(G.objectMap[origX][newY].name !== "null") // Steam hits water/fire/other steam?
				{
					G.makeObject(origX, origY); // Make the steam disappear
				}
				else // Nothing ahead of steam?
				{
					G.switcheroo(origX, origY, origX, newY); // Move the steam up one space
					if(steam.fade === true)
					{
						steam.dissipate = true;
					}
				}

			}

		},
		moveSteam : function(steam) // takes a steam object and attempts to move it to the left or the right on the map
		{
			var origX = steam.x; // Original X position
			var origY = steam.y; // Original Y position
			var newX = steam.x + steam.direction; // Tentative new X position

			if(newX > G.width - 1 || newX < 0 || G.objectMap[newX][origY].property === "hard")  // If the tentative new position is out of bounds or impassable
			{
				if((newX <= G.width - 1 && newX > 0) && G.objectMap[newX][origY].name === "ice") // If the tentative new position is within bounds and occupied by ICE
				{
                    PS.audioPlay("steam", {path : "audio/", volume : 0.3});
					G.makeObject(origX, origY); // remove the STEAM
                    PS.fade(newX, origY, 60);
					G.makeDrop(newX, origY, 0); // and turn the ICE into WATER
					G.objectMap[newX][origY].warmth = 3; // This makes sure the new WATER doesn't turn back to ICE immediately
				}
				else // The tentative new position is occupied by water/fire/other steam?
				{
					G.makeObject(origX, origY); // Make the steam disappear
				}
			}
			else // If the tentative new position is possible
			{
				G.switcheroo(origX, origY, newX, origY); // Move the steam to the left or right
			}
		},

		//FIRE FUNCTION//

		burnFire : function(fire) // Makes the fire flicker fire colors
		{
		    var redColor = [];
			redColor.push(PS.COLOR_YELLOW);
			redColor.push(PS.COLOR_RED);

            if(G.makingLevel === false)
            {
                PS.fade(fire.x, fire.y, 0);
            }
			PS.color(fire.x, fire.y, redColor[Math.floor(PS.random(redColor.length + 1)) - 1]);
		},

		//GENERAL OR MANAGER FUNCTIONS//

        switcheroo : function(origX, origY, newX, newY) // switches the places of two beads on the main map
        {
            var temp = G.objectMap[newX][newY];

            G.objectMap[newX][newY] = G.objectMap[origX][origY];
            G.objectMap[newX][newY].x = newX;
            G.objectMap[newX][newY].y = newY;

            G.objectMap[origX][origY] = temp;
            G.objectMap[origX][origY].x = origX;
            G.objectMap[origX][origY].y = origY;

            PS.fade(origX, origY, 0);
            PS.fade(newX, newY, 0);
            PS.color(origX, origY, G.objectMap[origX][origY].color);
            PS.color(newX, newY, G.objectMap[newX][newY].color);

            PS.border(origX, origY, {top : 0, bot : 0, left : 0, right : 0});
        },
		resetLevel : function() // resets the current level
		{
		    G.makingLevel = true;
			PS.fade(PS.ALL, PS.ALL, 0);
			PS.border(PS.ALL, PS.ALL, 0);
			G.objects = []; // resets the active objects array
			// draws the current level
			var map = G.levelArray[G.currentLevel];
			for(var count = 0; count < G.width; count++)
			{
				for(var count2 = 0; count2 < G.height; count2++)
				{
					if(map[count][count2] === null)
					{
						G.makeObject(count2, count);
					}
					else if(map[count][count2] === 1111)
					{
						G.makeChar(count2, count);
						G.char.x = count2;
						G.char.y = count;
						G.char.inJump = false;
						G.char.facing = "right";
						G.char.airTime = 0;
						G.char.apex = 0;
					}
					else if(map[count][count2] === 2222)
					{
						G.makeWall(count2, count);
					}
					else if(map[count][count2] === 3333)
					{
						G.makeFire(count2, count);
					}
					else if(map[count][count2] === 4444)
					{
						G.makeIce(count2, count);
					}
					else if(map[count][count2] === 5555)
					{
						G.makeExit(count2, count);
					}
				}
			};
            G.makingLevel = false;

			if(G.currentLevel === 0) // If it's the first level, begin giving the player the tutorial through the status line
			{
                G.dialogueCount = 0;
				PS.statusText("");
				if(G.dialogueTimer != null)
                {
				    PS.timerStop(G.dialogueTimer);
				    G.dialogueTimer = null;
                    G.playManual();
                    G.dialogueTimer = PS.timerStart(180, G.playManual);
                }
                else
				{
                    G.playManual();
                    G.dialogueTimer = PS.timerStart(180, G.playManual);
				}

			}
		},
		moveObject : function(object) // attempts to do something with an active object
		{
			var name = object.name;
			if(name === "drop")
			{
				if(G.onIce(object.x, object.y) === true) // if the WATER is adjacent to ICE
				{
					if(G.onFire(object.x, object.y) === false && object.warmth <= 0) // if the WATER is cold and not adjacent to FIRE
					{
                        PS.audioPlay("ice", {path : "audio/", volume : 0.1});
						G.makeIce(object.x, object.y); // turn the WATER into ICE
						return;
					}
					else // cool the water drop
					{
						object.warmth -= 1;
					}
					object.force = 0;
				}
				G.gravityDrop(object); // make the drop move down
				if(object.force !== 0)
				{
                    G.moveDrop(object); // move the drop to the sides
				}
			}
			else if(name === "char")
			{
				if(G.char.y + 1 > G.height - 1) // is the player falling into an abyss? Reset the level
				{
                    PS.audioPlay("fx_wilhelm", {volume : 0.2});
					G.resetLevel();
				}
                else if(G.onExit() === true) // is the player adjacent to an exit?
                {
                    if(G.char.inFrontOf === false && G.dialogueCount > G.dialogue.length)
                    {
                        if(G.currentLevel === G.levelArray.length - 1)
                        {
                            PS.statusColor(PS.makeRGB(255,215,0)); // A gold color
                            PS.statusText("You won! In total, you threw: " + G.dropCounter + " water balls!");
                        }
                        else
						{
                            PS.statusColor(PS.makeRGB(255,215,0)); // A gold color (exit color)
                            PS.statusText("The exit feels close!");
						}
                    }
                }
				else if(G.amDrowning() === true) // is the player surrounded by water
				{
					if(G.char.inFrontOf === false && G.dialogueCount > G.dialogue.length)
					{
						PS.statusColor(PS.COLOR_BLUE);  // (water color)
						PS.statusText("Glub glub, I can't swim!");
					}

				}
				else if(G.onFire(G.char.x, G.char.y) === true) // is the player adjacent to fire?
				{
					if(G.char.inFrontOf === false && G.dialogueCount > G.dialogue.length)
					{
						PS.statusColor(PS.COLOR_RED); // (fire color)
						PS.statusText("It feels pretty toasty here!");
					}
				}
				else if(G.onIce(G.char.x, G.char.y) === true) // is the player adjacent to ice?
				{
					if(G.char.inFrontOf === false && G.dialogueCount > G.dialogue.length)
					{
						PS.statusColor(PS.makeRGB(173, 216, 230)); // A bluish-white color (ice color)
						PS.statusText("Brrrr, it got cold!");
					}
				}
				else
				{
					if(G.dialogueCount > G.dialogue.length && G.char.inFrontOf === false)
					{
						PS.statusText("");
					}
				}

				if(G.char.y + 1 <= G.height - 1 && G.objectMap[G.char.x][G.char.y + 1].property === "hard") // is the player standing on something?
				{
					G.char.airTime = 0;
				}
				G.gravityChar(); // move the player down
			}
			else if(name === "ice")
			{
				if(G.onFire(object.x, object.y) === true) // if ICE is adjacent to FIRE, turn ICE to WATER
				{
					G.makeDrop(object.x, object.y, 0);
				}

				return;
			}
			else if(name === "fire")
			{
				G.burnFire(object); // make fire flicker
			}
			else if(name === "steam")
			{
				G.floatSteam(object); // make steam float
			}
		},
		update : function() // plays every frame (12 FPS)
		{
			var num = 0;
			while(num < G.objects.length)
			{
				if(G.objectMap[G.objects[num].x][G.objects[num].y].name !== G.objects[num].name) // if a previously active object changes name, remove it from the active array
				{
					G.objects.splice(num, 1);
				}
				else
				{
					G.moveObject(G.objects[num]);
				}
				num += 1;
			}
		},

		//TUTORIAL STUFF//

        dialogue : [], // The array that holds the basic tutorial of the game
		dialogueCount : 0, // which instruction to play
        dialogueTimer : null, // assigned to a PS.timerStart function that plays the basic tutorial of the game
		playManual : function()
		{

			if(G.dialogueCount === 1 || G.dialogueCount === 2)
			{
				PS.statusColor(PS.COLOR_GREEN); // (player character color)
			}
			else if(G.dialogueCount === 0)
			{
				PS.statusColor(G.char.handColor); // (player hand color)
			}
			else if(G.dialogueCount === 4)
			{
                PS.statusColor(PS.COLOR_YELLOW);
			}
			else
			{
				PS.statusColor(PS.COLOR_BLUE); // (water color)
			}

			PS.statusText(G.dialogue[G.dialogueCount]);

			if(G.dialogueCount > G.dialogue.length - 1) // finished playing the manual? Stop the timer
			{
				PS.statusText("");
				G.dialogueCount += 1;
				PS.timerStop(G.dialogueTimer);
				G.dialogueTimer = null;
				return;
			}
			G.dialogueCount += 1;
		}
	};

	//Basic Tutorial

	G.dialogue.push("Turn with the LEFT and RIGHT arrow keys.");
	G.dialogue.push("Jump with W and the UP arrow keys.");
	G.dialogue.push("Move with the A and D keys.");
	G.dialogue.push("Shoot water with SPACE key.");
    G.dialogue.push("Reset level with ESCAPE key.");

	//Add levels to level array

	G.levelArray.push(G.level1);
	G.levelArray.push(G.level2);
	G.levelArray.push(G.level3);
	G.levelArray.push(G.level4);
	G.levelArray.push(G.level5);
	G.levelArray.push(G.level6);

}());
PS.init = function(system, options)
{
	"use strict";

	// Use PS.gridSize( x, y ) to set the grid to
	// the initial dimensions you want (32 x 32 maximum)
	// Do this FIRST to avoid problems!
	// Otherwise you will get the default 8x8 grid

    PS.gridSize(G.width, G.height); // 32 x 32
    PS.gridColor(G.baseColor); // A black color
    PS.gridShadow (true, PS.COLOR_WHITE);
    PS.color(PS.ALL, PS.ALL, G.baseColor); // A black color
    PS.keyRepeat( true, 12, 6); // lower the default delay of accepting a key press

	PS.audioLoad("match", {path : "audio/"});
	PS.audioLoad("ice", {path : "audio/"});
	PS.audioLoad("steam", {path : "audio/"});
    PS.audioLoad("jump", {path : "audio/"});
    PS.audioLoad("step", {path : "audio/"});

    PS.audioLoad("fx_pop");
	PS.audioLoad("fx_wilhelm");
	PS.audioLoad("fx_drip2");

    G.resetLevel();
	PS.timerStart(G.fadeTimer, G.update); // start the update function that runs every frame (12 FPS)

	// Add any other initialization code you need here
};

// PS.touch ( x, y, data, options )
// Called when the mouse button is clicked on a bead, or when a bead is touched
// It doesn't have to do anything
// [x] = zero-based x-position of the bead on the grid
// [y] = zero-based y-position of the bead on the grid
// [data] = the data value associated with this bead, 0 if none has been set
// [options] = an object with optional parameters; see documentation for details
PS.touch = function(x, y, data, options)
{
	"use strict";
	// Uncomment the following line to inspect parameters
	//PS.debug( "PS.touch() @ " + x + ", " + y + "\n" );
	//PS.color(x, y, [PS.random(256) - 1, PS.random(256) - 1, PS.random(256) - 1]);
	// Add code here for mouse clicks/touches over a bead
};

// PS.release ( x, y, data, options )
// Called when the mouse button is released over a bead, or when a touch is lifted off a bead
// It doesn't have to do anything
// [x] = zero-based x-position of the bead on the grid
// [y] = zero-based y-position of the bead on the grid
// [data] = the data value associated with this bead, 0 if none has been set
// [options] = an object with optional parameters; see documentation for details

PS.release = function(x, y, data, options)
{
	"use strict";

	// Uncomment the following line to inspect parameters
	// PS.debug( "PS.release() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse button/touch is released over a bead
};

// PS.enter ( x, y, button, data, options )
// Called when the mouse/touch enters a bead
// It doesn't have to do anything
// [x] = zero-based x-position of the bead on the grid
// [y] = zero-based y-position of the bead on the grid
// [data] = the data value associated with this bead, 0 if none has been set
// [options] = an object with optional parameters; see documentation for details

PS.enter = function(x, y, data, options)
{
	"use strict";

	// Uncomment the following line to inspect parameters
	// PS.debug( "PS.enter() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch enters a bead
};

// PS.exit ( x, y, data, options )
// Called when the mouse cursor/touch exits a bead
// It doesn't have to do anything
// [x] = zero-based x-position of the bead on the grid
// [y] = zero-based y-position of the bead on the grid
// [data] = the data value associated with this bead, 0 if none has been set
// [options] = an object with optional parameters; see documentation for details

PS.exit = function(x, y, data, options)
{
	"use strict";

	// Uncomment the following line to inspect parameters
	// PS.debug( "PS.exit() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch exits a bead
};

// PS.exitGrid ( options )
// Called when the mouse cursor/touch exits the grid perimeter
// It doesn't have to do anything
// [options] = an object with optional parameters; see documentation for details

PS.exitGrid = function(options)
{
	"use strict";

	// Uncomment the following line to verify operation
	// PS.debug( "PS.exitGrid() called\n" );

	// Add code here for when the mouse cursor/touch moves off the grid
};

// PS.keyDown ( key, shift, ctrl, options )
// Called when a key on the keyboard is pressed
// It doesn't have to do anything
// [key] = ASCII code of the pressed key, or one of the following constants:
// Arrow keys = PS.ARROW_UP, PS.ARROW_DOWN, PS.ARROW_LEFT, PS.ARROW_RIGHT
// Function keys = PS.F1 through PS.F1
// [shift] = true if shift key is held down, else false
// [ctrl] = true if control key is held down, else false
// [options] = an object with optional parameters; see documentation for details

PS.keyDown = function(key, shift, ctrl, options)
{
	"use strict";

	switch (key)
	{
		case PS.KEY_ARROW_UP:
		case 119: // lower-case w
		case 87: // upper-case W
		{
			G.char.inFrontOf = false;
			if((G.char.y + 1 <= G.height - 1 && G.objectMap[G.char.x][G.char.y + 1].property === "hard") && G.char.inJump === false) // is the player standing on ground?
			{
				G.jumpChar();
			}

			break;
		}
		case 97: // lower-case a
		case 65: // upper-case A
		{
			G.char.inFrontOf = false;
			G.moveChar(-1);
			break;
		}
		case 100: // lower-case d
		case 68: // upper-case D
		{
			G.char.inFrontOf = false;
			G.moveChar(1);
			break;
		}
		case PS.KEY_ARROW_LEFT:
		{
			G.char.inFrontOf = false;
			G.turnChar(-1);
			break;
		}
		case PS.KEY_ARROW_RIGHT:
		{
			G.char.inFrontOf = false;
			G.turnChar(1);
			break;
		}
		case 32: //SPACE
		{
			var x = G.char.x;
			var y = G.char.y;
			var direction = G.char.facing;
			var force = 0;

			if(direction === "left")
			{
				x -= 1;
				force = -1;
			}
			else
			{
				x += 1;
				force = 1;
			}

			if(x >= 0 && x <= G.width - 1 && G.objectMap[x][y].name === "null") // nothing in front of the player
			{
				G.char.inFrontOf = false;
				if(G.onIce(x, y) === true)
				{
                    PS.audioPlay("ice", {path : "audio/", volume : 0.1});
					G.makeIce(x, y);
				}
				else
				{
					PS.audioPlay("fx_drip2");
					G.makeDrop(x, y, force);
				}
				G.dropCounter += 1;
			}
			else // something in front of the player, preventing the player from throwing water balls
			{
				if(G.dialogueCount > G.dialogue.length)
				{
					G.char.inFrontOf = true;
					PS.statusColor(PS.COLOR_BLUE);
					PS.statusText("Hands are blocked, I can't throw water balls.");
				}
			}
			break;
		}
		case PS.KEY_ESCAPE:
		{
			G.resetLevel(G.currentLevel);
			break;
		}
	};


	// Uncomment the following line to inspect parameters
	//	PS.debug( "DOWN: key = " + key + ", shift = " + shift + "\n" );

	// Add code here for when a key is pressed
};

// PS.keyUp ( key, shift, ctrl, options )
// Called when a key on the keyboard is released
// It doesn't have to do anything
// [key] = ASCII code of the pressed key, or one of the following constants:
// Arrow keys = PS.ARROW_UP, PS.ARROW_DOWN, PS.ARROW_LEFT, PS.ARROW_RIGHT
// Function keys = PS.F1 through PS.F12
// [shift] = true if shift key is held down, false otherwise
// [ctrl] = true if control key is held down, false otherwise
// [options] = an object with optional parameters; see documentation for details

PS.keyUp = function(key, shift, ctrl, options)
{
	"use strict";

	// Uncomment the following line to inspect parameters
	// PS.debug( "PS.keyUp(): key = " + key + ", shift = " + shift + ", ctrl = " + ctrl + "\n" );

	// Add code here for when a key is released
};

// PS.swipe ( data, options )
// Called when a mouse/finger swipe across the grid is detected
// It doesn't have to do anything
// [data] = an object with swipe information; see documentation for details
// [options] = an object with optional parameters; see documentation for details

PS.swipe = function(data, options)
{
	"use strict";

	// Uncomment the following block to inspect parameters

	/*
	 var len, i, ev;
	 PS.debugClear();
	 PS.debug( "PS.swipe(): start = " + data.start + ", end = " + data.end + ", dur = " + data.duration + "\n" );
	 len = data.events.length;
	 for ( i = 0; i < len; i += 1 ) {
	 ev = data.events[ i ];
	 PS.debug( i + ": [x = " + ev.x + ", y = " + ev.y + ", start = " + ev.start + ", end = " + ev.end +
	 ", dur = " + ev.duration + "]\n");
	 }
	 */

	// Add code here for when an input event is detected
};

// PS.input ( sensors, options )
// Called when an input device event (other than mouse/touch/keyboard) is detected
// It doesn't have to do anything
// [sensors] = an object with sensor information; see documentation for details
// [options] = an object with optional parameters; see documentation for details

PS.input = function(sensors, options)
{
	"use strict";

	// Uncomment the following block to inspect parameters
	/*
	PS.debug( "PS.input() called\n" );
	var device = sensors.wheel; // check for scroll wheel
	if ( device )
	{
		PS.debug( "sensors.wheel = " + device + "\n" );
	}
	*/
	
	// Add code here for when an input event is detected
};

