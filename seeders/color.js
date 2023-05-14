const Color = require('../models/Color');
const seedCollection = require('./seeder');



const colors = [
    {
        name: 'Red',
        hex: '#FF0000'
    },
    {
        name: 'Green',
        hex: '#008000'
    },
    {
        name: 'Blue',
        hex: '#0000FF'
    },
    {
        name: 'Yellow',
        hex: '#FFFF00'
    },
    {
        name: 'Purple',
        hex: '#800080'
    },
    {
        name: 'Orange',
        hex: '#FFA500'
    },
    {
        name: 'Pink',
        hex: '#FFC0CB'
    },
    {
        name: 'Black',
        hex: '#000000'
    },
    {
        name: 'White',
        hex: '#FFFFFF'
    },
    {
        name: 'Gray',
        hex: '#808080'
    },
    {
        name: 'Brown',
        hex: '#A52A2A'
    },
    {
        name: 'Cyan',
        hex: '#00FFFF'
    },
    {
        name: 'Magenta',
        hex: '#FF00FF'
    },
    {
        name: 'Lime',
        hex: '#00FF00'
    },
    {
        name: 'Gold',
        hex: '#FFD700'
    },
    {
        name: 'Silver',
        hex: '#C0C0C0'
    },
    {
        name: 'Teal',
        hex: '#008080'
    },
    {
        name: 'Navy',
        hex: '#000080'
    },
    {
        name: 'Maroon',
        hex: '#800000'
    },
    {
        name: 'Olive',
        hex: '#808000'
    },
    {
        name: 'Turquoise',
        hex: '#40E0D0'
    },
    {
        name: 'Indigo',
        hex: '#4B0082'
    },
    {
        name: 'Beige',
        hex: '#F5F5DC'
    },
    {
        name: 'Salmon',
        hex: '#FA8072'
    },
    {
        name: 'Violet',
        hex: '#EE82EE'
    },
    {
        name: 'Sky Blue',
        hex: '#87CEEB'
    },
    {
        name: 'Tan',
        hex: '#D2B48C'
    },
    {
        name: 'Fuchsia',
        hex: '#FF00FF'
    },
    {
        name: 'Khaki',
        hex: '#F0E68C'
    },
    {
        name: 'Aquamarine',
        hex: '#7FFFD4'
    },
    {
        name: 'Slate Gray',
        hex: '#708090'
    },
    {
        name: 'Dark Khaki',
        hex: '#BDB76B'
    },
    {
        name: 'Tomato',
        hex: '#FF6347'
    },
    {
        name: 'Deep Pink',
        hex: '#FF1493'
    },
    {
        name: 'Lawn Green',
        hex: '#7CFC00'
    },
    {
        name: 'Dark Orchid',
        hex: '#9932CC'
    },
    {
        name: 'Saddle Brown',
        hex: '#8B4513'
    },
    {
        name: 'Cornflower Blue',
        hex: '#6495ED'
    },
    {
        name: 'Dark Slate Blue',
        hex: '#483D8B'
    },
    {
        name: 'Medium Sea Green',
        hex: '#3CB371'
    },
    {
        name: 'Chocolate',
        hex: '#D2691E'
    },
    {
        name: 'Dark Salmon',
        hex: '#E9967A'
    },
    {
        name: 'Light Coral',
        hex: '#F08080'
    },
    {
        name: 'Olive Drab',
        hex: '#6B8E23'
    },
    {
        name: 'Sienna',
        hex: '#A0522D'
    },
    {
        name: 'Steel Blue',
        hex: '#4682B4'
    },
    {
        name: 'Cadet Blue',
        hex: '#5F9EA0'
    },
    {
        name: 'Rosy Brown',
        hex: '#BC8F8F'
    },
    {
        name: 'Pale Violet Red',
        hex: '#DB7093'
    },
    {
        name: 'Dark Turquoise',
        hex: '#00CED1'
    },
    {
        name: 'Firebrick',
        hex: '#B22222'
    },
    {
        name: 'Dark Goldenrod',
        hex: '#B8860B'
    },
    {
        name: 'Medium Purple',
        hex: '#9370DB'
    },
    {
        name: 'Dark Olive Green',
        hex: '#556B2F'
    },
    {
        name: 'Dark Orange',
        hex: '#FF8C00'
    },
    {
        name: 'Indian Red',
        hex: '#CD5C5C'
    },
    {
        name: 'Dark Slate Gray',
        hex: '#2F4F4F'
    },
    {
        name: 'Medium Orchid',
        hex: '#BA55D3'
    },
    {
        name: 'Dark Sea Green',
        hex: '#8FBC8F'
    },
    {
        name: 'Light Salmon',
        hex: '#FFA07A'
    }
];


seedCollection(Color, colors, 'Colors')
    .then(() => {
        console.log('Colors seeded successfully.');
    })
    .catch((error) => {
        console.log('Error seeding colors: ', error);
    });
