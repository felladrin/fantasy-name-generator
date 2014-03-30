/*
 * Fantasy Name Generator
 *
 * Copyright (c) 2014 Victor Nogueira
 * https://github.com/felladrin/fantasy-name-generator
 *
 * Licensed under the MIT License:
 * http://opensource.org/licenses/MIT
 */

/**
 * Generates a fantasy name joining random letters.
 */
function generate()
{
    var letter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    var consonant = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];

    var vowel = ['a', 'e', 'i', 'o', 'u'];

    var name = [];

    // Number of letters of the name to be generated.
    var numLetters = document.getElementById("num-chars").value;

    var selected;

    for (var i = 0; i < numLetters; i++)
    {
        selected = Math.floor(Math.random() * 26);

        if (name.length > 2)
        {
            var lastLetter = name.length - 1;
            var penultLetter = name.length - 2;

            // If the last two letters are equal, the next should be different.
            while (name[lastLetter] == selected && name[penultLetter] == selected)
                selected = Math.floor(Math.random() * 26);

            // If the last two letters are consonants, the next must be a vowel.
            if (consonant.indexOf(name[lastLetter]) != -1 && consonant.indexOf(name[penultLetter]) != -1)
            {
                selected = Math.floor(Math.random() * 5);
                name[i] = vowel[selected];
                continue;
            }
        }
        else
        {
            // If the first letter is a vowel, the second must be a consonant, and vice versa.
            if (vowel.indexOf(name[0]) != -1)
            {
                selected = Math.floor(Math.random() * 21);
                name[i] = consonant[selected];
                continue;
            }
            else if (consonant.indexOf(name[0]) != -1)
            {
                selected = Math.floor(Math.random() * 5);
                name[i] = vowel[selected];
                continue;
            }
        }

        name[i] = letter[selected];
    }

    // Name must not finish with two cosnsonants.
    if (consonant.indexOf(name[name.length - 1]) != -1 && consonant.indexOf(name[name.length - 2]) != -1)
    {
        selected = Math.floor(Math.random() * 5);
        name[name.length - 1] = vowel[selected];
    }

    // Joins all letters in a string.
    name = name.join('');

    // Uppercases the first letter.
    name = name.substr(0, 1).toUpperCase() + name.substr(1);

    // Prints the generated name.
    document.getElementById("name").value = name;

    // Apply some random color on the name.
    document.getElementById('name').style.color = randomColor();
}

/**
 * Generates a random hexadecial number.
 * @returns {string}
 */
function hex()
{
    return parseInt((Math.random() * 255)).toString(16);
}

/**
 * Generates a random color string with the format: #000000.
 * @returns {string}
 */
function randomColor()
{
    return '#' + hex() + hex() + hex();
}