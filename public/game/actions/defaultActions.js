let defaultActions = [
    {
        "name": "Sleep",
        "disposableRequirements": {
            "time": 10
        },
        "permanentRequirements": {},
        "products": {
            "sleep": 10
        }
    },
    {
        "name": "Move Right",
        "disposableRequirements": {
            "time": 10
        },
        "permanentRequirements": {},
        "products": {
            "x": 1
        }
    },
    {
        "name": "Move Left",
        "disposableRequirements": {
            "time": 10
        },
        "permanentRequirements": {},
        "products": {
            "x": -1
        }
    },
    {
        "name": "Move Up",
        "disposableRequirements": {
            "time": 10
        },
        "permanentRequirements": {},
        "products": {
            "y": -1
        }
    },
    {
        "name": "Move Down",
        "disposableRequirements": {
            "time": 10
        },
        "permanentRequirements": {},
        "products": {
            "y": 1
        }
    },
    {
        "name": "Eat",
        "disposableRequirements": {
            "time": 10,
            "food": 1
        },
        "permanentRequirements": {},
        "products": {
            "hunger": 10
        }
    },
    {
        "name": "Drink",
        "disposableRequirements": {
            "time": 5,
            "water": 1
        },
        "permanentRequirements": {},
        "products": {
            "thirst": 10
        }
    },
    {
        "name": "Hunt",
        "disposableRequirements": {
            "time": 30,
            "energy": 20
        },
        "permanentRequirements": {
            "hunting": 1
        },
        "products": {
            "food": 15,
            "fighting": 1
        }
    },
    {
        "name": "Gather Food",
        "disposableRequirements": {
            "time": 10,
            "energy": 3
        },
        "permanentRequirements": {
            "gathering": 1
        },
        "products": {
            "food": 5,
            "perception": 1
        }
    }
];
