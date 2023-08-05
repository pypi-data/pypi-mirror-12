import sys

from .space_delimited import SpaceDelimited

try:
    from nltk.corpus import stopwords as nltk_stopwords
    stopwords = set(nltk_stopwords.words('turkish'))
except LookupError:
    raise ImportError("Could not load stopwords for {0}. ".format(__name__) +
                      "You may need to install the nltk 'stopwords' " +
                      "corpora.  See http://www.nltk.org/data.html")

badwords = [
    r"ağzına sıçayım", r"ahlaksız", r"ahmak", r"am", r"amcık", r"amın oğlu",
    r"amına koyayım", r"amına koyyim", r"amk", r"aptal",
    r"beyinsiz", r"bok", r"boktan",
    r"çük",
    r"dedeler",
    r"embesil",
    r"gerizekalı", r"gerzek",
    r"haysiyetsiz",
    r"ibne", r"inci", r"it oğlu it",
    r"kıç",
    r"mal", r"meme",
    r"nobrain",
    r"oğlan", r"oğlancı",
    r"pezevengin evladı", r"pezevenk", r"piç", r"puşt",
    r"salak", r"şerefsiz", r"sik",
    r"yarrak",
    # TODO: merge these two lists and Regexify
    # TODO: WTF is this: "[ss][ııii][ççcc][aa][rryy][iiıı][mm]",
    r"adamın dib", r"adamın dip",
    r"ahlaksız",
    r"ahmak",
    r"allahsız",
    r"am", r"amcık",
    r"amk", r"amq",
    r"amın oğlu",
    r"amına([- ]?(koy|koyayım|koyyim))?",
    r"amını",
    r"ananı",
    r"ananın am", r"ananın dölü",
    r"ananızın([- ]?am)?",
    r"anasını",
    r"anasının am",
    r"antisemitic",
    r"aptal",
    r"asdf",
    r"ağzına sıçayım",
    r"beyinsiz",
    r"bi bok", r"bok", r"boktan", r"bokça",
    r"dedeler",
    r"dinci", r"dinsiz",
    r"dönek",
    r"dıcks",
    r"embesil",
    r"eshek",
    r"gerizekalı",
    r"gerzek",
    r"godoş",
    r"gotten",
    r"göt([- ]?(deliği|oğlanı))?", r"göt(lek|oğlanı|veren|ü|ün)",
    r"haysiyetsiz",
    r"heval", r"hewal",
    r"huur",
    r"i.b.n.e", r"ibne", r"ibnedir", r"ibneli k", r"ibnelik",
    r"inci",
    r"israil köpektir",
    r"it[- ]?oğlu[- ]?it",
    r"kaltak",
    r"kaşar",
    r"kevaşe",
    r"kıç",
    r"liboş",
    r"mal",
    r"meme",
    r"nesi kaşar",
    r"nobrain",
    r"o. çocuğ",
    r"orospu([ -]?(cocugu|çoc|çocuğu|çocuğudur))?", r"orospudur",
    r"orospunun([ -]?(evladı))?", r"orospuçocuğu",
    r"oğlan", r"oğlancı",
    r"pezeven", r"pezeveng", r"pezevengin evladı", r"pezevenk",
    r"pisliktir",
    r"piç",
    r"puşt", r"puşttur",
    r"pıgs",
    r"reyiz",
    r"sahip",
    r"serkan",
    r"salak",
    r"sik", r"sikem", r"siken", r"siker", r"sikerim", r"sikey", r"sikici",
    r"sikik", r"sikil", r"sikiş", r"sikişme", r"sikm", r"sikseydin",
    r"sikseyidin", r"sikt", r"siktim", r"siktir([- ]?(lan))?",
    r"sokarım", r"sokayım",
    r"swicht şamandra",
    r"tipini s.k", r"tipinizi s.keyim",
    r"veled", r"weled",
    r"woltağym",
    r"woğtim",
    r"wulftim",
    r"yarrak", r"yarrağ",
    r"yavş", r"yavşak",
    r"yavşaktır",
    r"zippo dünyanın en boktan çakmağıdır",
    r"zortlamasi",
    r"zıkkımım",
    r"zıonısm",
    r"çük",
    r"ıbnelık",
    r"ın tröst we trust",
    r"şerefsiz"
]

informals = [
    r"achtırma",
    r"achıyorlardı",
    r"arkadashlar",
    r"arkadashım",
    r"basharamıyor",
    r"basharan",
    r"basharıla",
    r"bashka",
    r"bashlangıc",
    r"bashlıyor",
    r"bashıma",
    r"bashının",
    r"beshinci",
    r"beshtane",
    r"chalıshmıshlar", r"chalıshıldıgında", r"chalıshılınırsa",
    r"chalıshıyorlar", r"chalıshıyorsun", r"chalıshıyorum",
    r"chamashırlar",
    r"charpmadan",
    r"charptı", r"charpınca",
    r"chevirsin", r"chevırdım",
    r"chimdirecem",
    r"choluk",
    r"chorusdan", r"choruslar",
    r"chıka", r"chıkacak", r"chıkmadı", r"chıksa", r"chıktı", r"chıkıp",
    r"chıkısh",
    r"chıplak",
    r"degishen", r"degishiklik", r"degishiyor",
    r"dönüshü",
    r"eastblacksea",
    r"eshekoglu",
    r"eshkıyanın",
    r"gardash", r"gardashlık", r"gardaslık",
    r"gecherken",
    r"gechirdi", r"gechirmeyeyeyim", r"gechiyor", r"gechti", r"gechtim",
    r"genish",
    r"gerchegi",
    r"ichimde", r"ichimden", r"ichin", r"ichine", r"ichini",
    r"ichlerinde",
    r"ishler",
    r"kalmısh",
    r"kardeshlerini", r"kardeshlerinizde",
    r"karshı",
    r"keshke",
    r"kishiler", r"kishilerin", r"kishinin", r"kishiye", r"kishiyle",
    r"konushmalrını", r"konushmuyor", r"konushuldugunda", r"konushur",
    r"koshan", r"koshtu", r"koshuyor",
    r"nıshanlı",
    r"saatchide",
    r"sachlı",
    r"sanatchılarını",
    r"shansin", r"shansın",
    r"shashırtma", r"shashırtmaya",
    r"sheytanlar",
    r"takabeg",
    r"theır",
    r"uchakdan",
    r"uzanmıshsın",
    r"yaklashdıkdan",
    r"yakıshıklı",
    r"yaratılmısh",
    r"yashamak", r"yashatıyorsun", r"yashta", r"yashıyorsun",
    r"yerleshtiriyorum",
    r"yozgatfm",
    r"üch",
    r"ıchın",
    r"ıshıksız"
]


sys.modules[__name__] = SpaceDelimited(
    __name__,
    doc="""
turkish
=======

revision
--------
.. autoattribute:: revision.words
.. autoattribute:: revision.content_words
.. autoattribute:: revision.badwords
.. autoattribute:: revision.informals

parent_revision
---------------
.. autoattribute:: parent_revision.words
.. autoattribute:: parent_revision.content_words
.. autoattribute:: parent_revision.badwords
.. autoattribute:: parent_revision.informals

diff
----
.. autoattribute:: diff.words_added
.. autoattribute:: diff.words_removed
.. autoattribute:: diff.badwords_added
.. autoattribute:: diff.badwords_removed
.. autoattribute:: diff.informals_added
.. autoattribute:: diff.informals_removed
    """,
    badwords=badwords,
    informals=informals,
    stopwords=stopwords
)
"""
turkish
"""
