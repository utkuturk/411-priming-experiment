var shuffleSequence = seq("intro",
    "intro_sep",
    sepWith("within_intro_sep", "practice"),
    "practice_sep",
    sepWith("sep",
        rshuffle(startsWith("condition"),
            startsWith("filler"),
        )), //
    "send_results",
    "debrief");
var practiceItemTypes = ["practice"];

// default settings
var manualSendResults = true;

var centerItems = true;
var showProgressBar = false;

var defaults = [

    "Separator", {
        showProgressBar: false,
        transfer: 1000,
        normalMessage: "Correct! Wonderful!",
        errorMessage: "Opps! Incorrect, please try again."
    },

    "DashedSentence", {
        mode: "self-paced reading"
    },
    "myquestion", {
        hideProgressBar: true,
        randomOrder: false,
        presentHorizontally: true,
        hasCorrect: false,
        timeout: 2500
    },
    "Question", {
        hideProgressBar: true,
        randomOrder: false,
        presentHorizontally: true,
        hasCorrect: false,
        timeout: 2500
    },
    "Message", {
        hideProgressBar: true,
        centerItems: true
    },
    "mymessage", {
        hideProgressBar: true,
        centerItems: true,
        transfer: 1000
    },
    "Form", {
        hideProgressBar: true,
        continueOnReturn: true,
        saveReactionTime: true,
        continueMessage: "Devam etmek için buraya tıklayınız.",
        obligatoryCheckboxErrorGenerator: function (field) {
            return "Bu alanı doldurmanız gerekmektedir."
        },
        obligatoryErrorGenerator: function (field) {
            return "Bu alanı doldurmanız gerekmektedir.";
        },
        obligatoryRadioErrorGenerator: function (field) {
            return "Seçeneklerden birini seçiniz.";
        }

    }
];

function modifyRunningOrder(ro) {
    for (var i = 0; i < ro.length; ++i) {
        if ((i != 0) && (i % 40 == 0)) {
            // Passing 'true' as the third argument casues the results from this controller to be omitted from the results file. 
            // (Though in fact, the Message controller does not add any results in any case.)
            ro[i].push(new DynamicElement(
                "Message", {
                    html: "<p>Kısa bir ara. Bir sonraki cümleye geçmek için boşluk tuşuna basınız.</p>",
                    transfer: "keypress"
                }, //, transfer: 1000 
                true
            ));
        }
    }
    return ro;
}


var items = [
        ["send_results", "__SendResults__", {}],

        ["sep", "Separator", {
            hideProgressBar: false,
            transfer: "keypress",
            normalMessage: "Bir sonraki kelime setine geçmek için boşluk tuşuna basınız.",
            errorMessage: "Bir sonraki kelime setine geçmek için boşluk tuşuna basınız."
        }],

        ["intro_sep", "Separator", {
            hideProgressBar: false,
            transfer: "keypress",
            normalMessage: "Deneyden önceki alıştırma kısmına başlamak için boşluk tuşuna basınız. Bu kısımda size cevaplarınızın doğruluğuna göre geridönüt verilecektir.",
            errorMessage: "Deneyden önceki alıştırma kısmına başlamak için boşluk tuşuna basınız. Bu kısımda size cevaplarınızın doğruluğuna göre geridönüt verilecektir."
        }],

        ["within_intro_sep", "Separator", {
            hideProgressBar: false,
            transfer: "keypress",
            normalMessage: "Bir sonraki kelime setine geçmek için boşluk tuşuna basınız.",
            errorMessage: "Lütfen cevap verirken biraz daha dikkatli olalım."
        }],

        ["practice_sep", "Separator", {
            hideProgressBar: false,
            transfer: "keypress",
            normalMessage: "Deneye başlamak için boşluk tuşuna basınız.",
            errorMessage: "Lütfen cevap verirken biraz daha dikkatli olalım."
        }],

        ["intro", "Form", {
            html: {
                include: "introduction.html"
            },
            obligatoryCheckboxErrorGenerator: function (field) {
                return "Devam etmeden önce çalışmaya katılmayı kabul etmelisiniz.";
            }
        }],

        ["intro", "Form", {
            html: {
                include: "consent.html"
            },
            obligatoryCheckboxErrorGenerator: function (field) {
                return "Devam etmeden önce çalışmaya katılmayı kabul etmelisiniz.";
            }
        }],

        ["intro", "Form", {
            html: {
                include: "procedure.html"
            }
        }],

        ["intro", "Form", {
            html: {
                include: "final_instructions.html"
            }
        }],

        ["debrief", "mymessage", {
            html: ["div",
                "Deney sona erdi. Yanıtlarınız otomatik olarak kaydedildi. Katılımınız için çok teşekkür ederiz!"],
            transfer: 3000
        }],

        ["practice","mymessage", {html: "+"},
        "mymessage", {html: "göz"},
        "mymessage", {html: "+"}, 
        "mymessage", {html: "bina"},
        "mymessage", {html: "+"}, 
        "myquestion", {hasCorrect:1, q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
        ["practice","mymessage", {html: "+"},
        "mymessage", {html: "ağır"},
        "mymessage", {html: "+"}, 
        "mymessage", {html: "übtey"},
        "mymessage", {html: "+"}, 
        "myquestion", {hasCorrect: 0, q: "",as: [["f","HAYIR"], ["j","EVET"]] }],

        ["practice", Message, {
            consentRequired: false,
            transfer: "keypress",
            html: ["div",
                ["p", "Deney esnasında vereceğiniz cevapları olabildiğince hızlı ve doğru vermeye çalışın. Deney boyunca deneye odaklanmanız gerekmektedir. Alıştırmaların aksine, deneyin kendisinde size geridönüt verilmeyecektir."],
                ["p", "Katılımınız için şimdiden çok teşekkürler!"],
            ]
        }],

        [["condition_related",1],"mymessage", {html: "+"},
        "mymessage", {html: "monitör</p>"},
        "mymessage", {html: "+"}, 
        "mymessage", {html: "bilgisayar</p>"},
        "mymessage", {html: "+"}, 
        "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
        [["condition_unrelated",1],"mymessage", {html: "+"},
        "mymessage", {html: "fındık</p>"},
        "mymessage", {html: "+"}, 
        "mymessage", {html: "bilgisayar</p>"},
        "mymessage", {html: "+"}, 
        "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
        [["condition_related",2],"mymessage", {html: "+"},
        "mymessage", {html: "ahize</p>"},
        "mymessage", {html: "+"}, 
        "mymessage", {html: "telefon</p>"},
        "mymessage", {html: "+"}, 
        "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
        [["condition_unrelated",2],"mymessage", {html: "+"},
        "mymessage", {html: "kapı</p>"},
        "mymessage", {html: "+"}, 
        "mymessage", {html: "telefon</p>"},
        "mymessage", {html: "+"}, 
        "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
        [["filler",101],"mymessage", {html: "+"},
        "mymessage", {html: "hücre</p>"},
        "mymessage", {html: "+"}, 
        "mymessage", {html: "turus</p>"},
        "mymessage", {html: "+"}, 
        "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],
        [["filler",102],"mymessage", {html: "+"},
        "mymessage", {html: "dosya</p>"},
        "mymessage", {html: "+"}, 
        "mymessage", {html: "felpa</p>"},
        "mymessage", {html: "+"}, 
        "myquestion", {q: "",as: [["f","HAYIR"], ["j","EVET"]] }],

];