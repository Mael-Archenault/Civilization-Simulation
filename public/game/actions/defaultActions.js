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
        "name": "Eat",
        "disposableRequirements": {
            "time": 1,
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
            "time": 1,
            "water": 1
        },
        "permanentRequirements": {},
        "products": {
            "thirst": 10
        }
    },
    {
        "name": "Meditate",
        "disposableRequirements": {
            "time": 5
        },
        "permanentRequirements": {},
        "products": {
            "meditation": 5,
            "happiness": 5,
            "energy": 2
        }
    },
    {
        "name": "Hunt",
        "disposableRequirements": {
            "time": 10,
            "energy": 5
        },
        "permanentRequirements": {
            "hunting": 1
        },
        "products": {
            "food": 3,
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
            "food": 2,
            "perception": 1
        }
    },
    {
        "name": "Trade",
        "disposableRequirements": {
            "time": 5
        },
        "permanentRequirements": {
            "trading": 1
        },
        "products": {
            "food": 1,
            "water": 1,
            "charisma": 1
        }
    },
    {
        "name": "Craft Tools",
        "disposableRequirements": {
            "time": 10,
            "energy": 5
        },
        "permanentRequirements": {
            "crafting": 1
        },
        "products": {
            "engineering": 1,
            "trading": 1
        }
    },
    {
        "name": "Train Fighting",
        "disposableRequirements": {
            "time": 10,
            "energy": 5
        },
        "permanentRequirements": {},
        "products": {
            "fighting": 2,
            "resilience": 1
        }
    },
    {
        "name": "Study",
        "disposableRequirements": {
            "time": 10,
            "energy": 3
        },
        "permanentRequirements": {},
        "products": {
            "intelligence": 2,
            "education": 2
        }
    },
    {
        "name": "Explore",
        "disposableRequirements": {
            "time": 10,
            "energy": 5
        },
        "permanentRequirements": {},
        "products": {
            "exploration": 2,
            "perception": 1
        }
    },
    {
        "name": "Practice Diplomacy",
        "disposableRequirements": {
            "time": 5
        },
        "permanentRequirements": {
            "diplomacy": 1
        },
        "products": {
            "charisma": 1,
            "leadership": 1
        }
    },
    {
        "name": "Train Leadership",
        "disposableRequirements": {
            "time": 10
        },
        "permanentRequirements": {
            "leadership": 1
        },
        "products": {
            "leadership": 2,
            "communication": 1
        }
    },
    {
        "name": "Practice Medicine",
        "disposableRequirements": {
            "time": 10
        },
        "permanentRequirements": {
            "medecine": 1
        },
        "products": {
            "health": 5
        }
    },
    {
        "name": "Pray or Reflect",
        "disposableRequirements": {
            "time": 5
        },
        "permanentRequirements": {},
        "products": {
            "spirituality": 2,
            "happiness": 3
        }
    }
];
