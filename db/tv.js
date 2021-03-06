﻿const tv = [
    {
        "name": "abs-пластик",
        "Q_H": "35.00",
        "as": "t"
    },
    {
        "name": "алюминиевый порошок",
        "Q_H": "31.10",
        "as": "t"
    },
    {
        "name": "антрацит",
        "Q_H": "34.80",
        "as": "t"
    },
    {
        "name": "ацетон",
        "Q_H": "31.36",
        "as": "f"
    },
    {
        "name": "белок растительный",
        "Q_H": "23.45",
        "as": "t"
    },
    {
        "name": "бензин аи 93",
        "Q_H": "43.64",
        "as": "f"
    },
    {
        "name": "бензол",
        "Q_H": "40.58",
        "as": "f"
    },
    {
        "name": "брикеты бурого угля",
        "Q_H": "20.20",
        "q_kr": "35.0",
        "as": "t"
    },
    {
        "name": "бумага",
        "Q_H": "13.40",
        "prio": "2",
        "as": "t"
    },
    {
        "name": "войлок строительный",
        "Q_H": "18.88",
        "as": "t"
    },
    {
        "name": "волокно ацетатное",
        "Q_H": "18.77",
        "as": "t"
    },
    {
        "name": "волокно вискозное",
        "Q_H": "15.60",
        "as": "t"
    },
    {
        "name": "волокно капроновое",
        "Q_H": "30.72",
        "as": "t"
    },
    {
        "name": "волокно нитрон",
        "Q_H": "30.75",
        "as": "t"
    },
    {
        "name": "волокно полиэфирное",
        "Q_H": "22.58",
        "as": "t"
    },
    {
        "name": "верхняя одежда, ворс.ткани",
        "Q_H": "23.30",
        "as": "t"
    },
    {
        "name": "дерматин",
        "Q_H": "21.54",
        "as": "t"
    },
    {
        "name": "диз. топливо \"з\"",
        "Q_H": "43.59",
        "as": "f"
    },
    {
        "name": "диз. топливо \"л\"",
        "Q_H": "43.42",
        "as": "f"
    },
    {
        "name": "древесина",
        "Q_H": "13.80",
        "q_kr": "13.9",
        "prio": "1",
        "as": "t"
    },
    {
        "name": "древесно-волокнистая плита",
        "Q_H": "13.80",
        "q_kr": "13.0",
        "as": "t"
    },
    {
        "name": "древесно-стружечная плита",
        "Q_H": "13.80",
        "q_kr": "12.0",
        "as": "t"
    },
    {
        "name": "древесные опилки",
        "Q_H": "18.60",
        "q_kr": "13.9",
        "as": "t"
    },
    {
        "name": "жиры животные",
        "Q_H": "40.00",
        "as": "f"
    },
    {
        "name": "зерно",
        "Q_H": "16.80",
        "as": "t"
    },
    {
        "name": "искусственная кожа",
        "Q_H": "17.76",
        "q_kr": "18.0",
        "as": "t"
    },
    {
        "name": "кальций (стружка)",
        "Q_H": "15.80",
        "as": "t"
    },
    {
        "name": "каменный уголь",
        "Q_H": "31.25",
        "as": "t"
    },
    {
        "name": "канифоль",
        "Q_H": "30.40",
        "as": "t"
    },
    {
        "name": "капрон",
        "Q_H": "31.09",
        "as": "t"
    },
    {
        "name": "капронарболитовые изделия",
        "Q_H": "26.90",
        "as": "t"
    },
    {
        "name": "карболитовые изделий",
        "Q_H": "26.90",
        "as": "t"
    },
    {
        "name": "карболитовые изделия",
        "Q_H": "26.90",
        "as": "t"
    },
    {
        "name": "картон",
        "Q_H": "13.80",
        "as": "t"
    },
    {
        "name": "картон гофрированный",
        "Q_H": "15.10",
        "as": "t"
    },
    {
        "name": "каучук натуральный",
        "Q_H": "44.73",
        "as": "t"
    },
    {
        "name": "каучук синтетический",
        "Q_H": "40.20",
        "as": "t"
    },
    {
        "name": "каучук скс",
        "Q_H": "43.89",
        "as": "t"
    },
    {
        "name": "каучук хлоропреновый",
        "Q_H": "27.99",
        "as": "t"
    },
    {
        "name": "керосин осветительный",
        "Q_H": "43.69",
        "as": "f"
    },
    {
        "name": "кинопленка триацетатная",
        "Q_H": "18.80",
        "as": "t"
    },
    {
        "name": "крупы",
        "Q_H": "17.00",
        "as": "t"
    },
    {
        "name": "ксилол",
        "Q_H": "43.15",
        "as": "f"
    },
    {
        "name": "лен разрыхленный",
        "Q_H": "15.70",
        "as": "t"
    },
    {
        "name": "линкруст поливинилхлоридный",
        "Q_H": "17.08",
        "q_kr": "10.0",
        "as": "t"
    },
    {
        "name": "линолеум",
        "Q_H": "21.00",
        "prio": "9",
        "as": "t"
    },
    {
        "name": "линолеум пвх",
        "Q_H": "14.31",
        "q_kr": "10.0",
        "as": "t"
    },
    {
        "name": "линолеум пвх двухслойный",
        "Q_H": "17.91",
        "q_kr": "10.0",
        "as": "t"
    },
    {
        "name": "линопор",
        "Q_H": "19.71",
        "as": "t"
    },
    {
        "name": "магний",
        "Q_H": "25.10",
        "as": "t"
    },
    {
        "name": "мазут",
        "Q_H": "39.80",
        "as": "f"
    },
    {
        "name": "масло смазочное",
        "Q_H": "41.87",
        "prio": "8",
        "as": "f"
    },
    {
        "name": "масло твердое животное",
        "Q_H": "38.20",
        "as": "f"
    },
    {
        "name": "масло трансформаторное",
        "Q_H": "43.11",
        "as": "f"
    },
    {
        "name": "металлопласт",
        "q_kr": "24.0",
        "as": "t"
    },
    {
        "name": "метанол",
        "Q_H": "23.84",
        "as": "f"
    },
    {
        "name": "мипора",
        "Q_H": "17.40",
        "as": "t"
    },
    {
        "name": "мука",
        "Q_H": "16.80",
        "as": "t"
    },
    {
        "name": "натрий",
        "Q_H": "10.88",
        "as": "t"
    },
    {
        "name": "нафталин",
        "Q_H": "39.40",
        "as": "t"
    },
    {
        "name": "обои моющиеся пвх на бумажной основе",
        "Q_H": "13.40",
        "q_kr": "12.0",
        "as": "t"
    },
    {
        "name": "одежда",
        "Q_H": "20.00",
        "prio": "7",
        "as": "t"
    },
    {
        "name": "парафин",
        "Q_H": "11.20",
        "as": "t"
    },
    {
        "name": "пенопласт пхв-1",
        "Q_H": "19.51",
        "as": "t"
    },
    {
        "name": "пенопласт фс-7",
        "Q_H": "24.43",
        "as": "t"
    },
    {
        "name": "пенопласт фф",
        "Q_H": "31.40",
        "as": "t"
    },
    {
        "name": "пенополиизоцианурат",
        "Q_H": "26.30",
        "as": "t"
    },
    {
        "name": "пенополиуретан",
        "Q_H": "24.30",
        "as": "t"
    },
    {
        "name": "пергамин",
        "q_kr": "17.4",
        "as": "t"
    },
    {
        "name": "полиамид",
        "Q_H": "25.70",
        "as": "t"
    },
    {
        "name": "поливинилхлорид (ПВХ)",
        "Q_H": "20.70",
        "prio": "6",
        "as": "t"
    },
    {
        "name": "поликарбонат",
        "Q_H": "31.00",
        "as": "t"
    },
    {
        "name": "полипропилен",
        "Q_H": "45.67",
        "as": "t"
    },
    {
        "name": "полистирол",
        "Q_H": "39.00",
        "as": "t"
    },
    {
        "name": "полиуретан",
        "Q_H": "24.30",
        "as": "t"
    },
    {
        "name": "полиэтилен (пластмасса)",
        "Q_H": "47.14",
        "q_kr": "15.4",
        "prio": "4",
        "as": "t"
    },
    {
        "name": "полиэфирный порошок",
        "Q_H": "25.14",
        "as": "t"
    },
    {
        "name": "резина",
        "Q_H": "33.52",
        "prio": "5",
        "as": "t"
    },
    {
        "name": "рубероид",
        "Q_H": "29.50",
        "as": "t"
    },
    {
        "name": "рулонная кровля",
        "q_kr": "17.4",
        "as": "t"
    },
    {
        "name": "сахар",
        "Q_H": "16.48",
        "as": "t"
    },
    {
        "name": "сено",
        "Q_H": "14.70",
        "q_kr": "7",
        "as": "t"
    },
    {
        "name": "смола искусственная",
        "Q_H": "16.80",
        "as": "t"
    },
    {
        "name": "стекло органическое",
        "Q_H": "27.70",
        "as": "t"
    },
    {
        "name": "стеклопластик",
        "Q_H": "46.60",
        "q_kr": "15.3",
        "as": "t"
    },
    {
        "name": "текстиль",
        "Q_H": "18.84",
        "as": "t"
    },
    {
        "name": "текстолит",
        "Q_H": "20.90",
        "as": "t"
    },
    {
        "name": "толуол",
        "Q_H": "40.94",
        "as": "f"
    },
    {
        "name": "торф брикетный",
        "Q_H": "16.60",
        "q_kr": "13.2",
        "as": "t"
    },
    {
        "name": "торф кусковой",
        "Q_H": "16.60",
        "q_kr": "9.8",
        "as": "t"
    },
    {
        "name": "уайт-спирит",
        "Q_H": "43.97",
        "as": "f"
    },
    {
        "name": "хлопок (ткань)",
        "Q_H": "16.80",
        "q_kr": "8.0",
        "prio": "3",
        "as": "t"
    },
    {
        "name": "хлопок в тюках",
        "Q_H": "16.75",
        "q_kr": "7.5",
        "as": "t"
    },
    {
        "name": "целофан",
        "Q_H": "17.37",
        "as": "t"
    },
    {
        "name": "шёлк",
        "Q_H": "21.00",
        "as": "t"
    },
    {
        "name": "шерсть",
        "Q_H": "20.50",
        "as": "t"
    },
    {
        "name": "этанол",
        "Q_H": "30.56",
        "as": "f"
    },
    {
        "name": "эмаль ПФ-115",
        "Q_H": "43.70",
        "prio": "10",
        "as": "f"
    }
    ]
