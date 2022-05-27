var config = {
    // The style and token
    style: 'mapbox://styles/sherlker/cl3fuiig9006o14nw3kt3p21q',
    accessToken: 'pk.eyJ1Ijoic2hlcmxrZXIiLCJhIjoiY2p5bDVwMHJmMDR1djNscDd1eWF4eHpnMiJ9.Vbcq4CS53bHzqfWU_mAaHA',
    markerColor: '#46545e',
    inset: true,
    theme: 'light',
    //set true for enabling 3D maps
    use3dTerrain: true, 
    title: 'The Seven Voyages of Zheng He',
    subtitle: '1405-1433 CE',
    //byline: '1405-1433 CE',
    footer: "Learn more details by interacting with the map and hovering over the points along the routes.",
    chapters: [

        // The introduction
        {
            id: 'overview',
            alignment: 'right',
            hidden: false,
            //title: '',
            description: "The history of maritime routes can be traced back thousands of years to links between Southeast Asia, the Indus Valley Civilization, and the Arabian Peninsula. As sailors from the Arabian Peninsula forged new trading routes across the Arabian Sea and into the Indian Ocean, this network began to expand in the early Middle Ages. Maritime trading links were established between Arabia and China from as early as the 8th century. Technological advances in navigation, astronomy, and naval architecture have made long-distance sea travel increasingly popular.<br/><n/><br/>During the Chinese Ming Dynasty (1405–1433 CE), Zheng He, a Chinese explorer, was sent by the Ming dynasty emperor Yongle (1403–1424 CE) on diplomatic missions to increase trade and cultural communication. Zheng He travelled to more than 30 countries in Asia and Africa, covering more than 100,000 kilometres during seven voyages. One of the purposes of Zheng He's visit was to open a maritime silk road (single dashed lines) across Central Asia, as the overland silk road (double dashed lines) across Central Asia was declining at that time. The knowledge, ideas, and exotic goods he brought back home created an interest in foreign countries among Chinese, which contributed to China's increased role in world trade and stimulated the emigration waves in later centuries.",
            //image: 'https://raw.githubusercontent.com/sherlkk/DVG/main/timeline.jpg',
            location: {
				center: { lon: 93.9999, lat: 26.20345 },
				zoom: 2.2,
				pitch: 0.00,
				bearing: 0.00
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                {
                    layer: 'ffull',
                    opacity: 0.9,
                    duration: 3000
                },

                {
                    layer: 'zhenghe',
                    opacity: 0.9,
                    duration: 3000
                }
            ],
            onChapterExit: [
                {
                    layer: 'ffull',
                    opacity: 0.5,
                    duration: 5000
                },
				
				{
                    layer: 'zhenghe',
                    opacity: 0,
                    duration: 3000
                },
                
            ],
            
        },

        // The timeline 
        {
            id: 'intro',
            alignment: 'fully',
            hidden: false,
            title: "Timeline of Zheng He's seven voyages",
            description: "The different colours in the diagram represent the new routes explored on the various voyages.",
            image: 'https://raw.githubusercontent.com/sherlkk/DVG/main/timeline.jpg',
            location: {
				center: { lon: 73.81560, lat: 16.94024 },
				zoom: 3,
				pitch: 0.00,
				bearing: 0.00
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                {
                    layer: 'malay',
                    opacity: 1,
                    duration: 3000
                },
                
                {
                    layer: 'lanka',
                    opacity: 1,
                    duration: 3000
                },

                {
                    layer: 'second',
                    opacity: 1,
                    duration: 4000
                },

                {
                    layer: 'one',
                    opacity: 1,
                    duration: 4000
                },

                {
                    layer: 'fourthh',
                    opacity: 1,
                    duration: 7000
                },

                {
                    layer: 'dot',
                    opacity: 1,
                    duration: 7000
                },

                {
                    layer: 'fourth',
                    opacity: 1,
                    duration: 7000
                },

                {
                    layer: '56',
                    opacity: 1,
                    duration: 9000
                },

                {
                    layer: 'east',
                    opacity: 1,
                    duration: 9000
                },

            ],
            onChapterExit: [
                
                {
                    layer: 'lanka',
                    opacity: 0,
                    duration: 5000
                },

                {
                    layer: 'second',
                    opacity: 0,
                    duration: 5000
                },

                {
                    layer: 'one',
                    opacity: 0,
                    duration: 7000
                },

                {
                    layer: 'fourthh',
                    opacity: 0,
                    duration: 5000
                },

                {
                    layer: 'dot',
                    opacity: 0,
                    duration: 5000
                },

                {
                    layer: 'fourth',
                    opacity: 0,
                    duration: 5000
                },

                {
                    layer: '56',
                    opacity: 0,
                    duration: 5000
                },

                {
                    layer: 'east',
                    opacity: 0,
                    duration: 5000
                },

                
            ],
            
        },

        // The introduction of Mao Kun Map
        {
            id: 'maokun',
            alignment: 'full',
            hidden: false,
            title: "The Mao Kun Map, usually referred to as Zheng He's Navigation Map in modern Chinese, is a set of navigation maps published in the Ming dynasty military treatise Wu Bei Zhi. The book was compiled by Mao Yuanyi in 1621 and published in 1628. The map is often regarded as a surviving document from the expeditions of Zheng He, in addition to recordings written by Zheng's officers. It is the earliest known Chinese map that includes adequate representation of Southern Asia, Persia, Arabia, and East Africa.",
            image: 'https://raw.githubusercontent.com/sherlkk/DVG/main/maokun123.jpg',
            description: "Opening pages of the Mao Kun Map in the Wu Bei Zhi.<br/> The map begins at the shipyard in the Ming capital of Nanjing. As the map reaches the mouth of the river, sailing instructions appear for headings from harbors. <br/>Source: <a href='https://www.loc.gov/item/2004633695/'>Wu Bei Zhi</a> // More Details:  <a href='https://barbierilow.faculty.history.ucsb.edu/Research/ZhengHeMapZoomify/ZhengHe.htm'>Interactive Mao Kun Map from Professor Anthony Barbieri</a> // <a href='https://zhenghe.rslc.us'>Mao Kun Map Explorer</a>" ,
            location: {
                center: { lon: 116.78687, lat: 26.58201 },
                zoom: 4.90,
                pitch: 40.50,
                bearing: -32.00
                //speed: 2, 
                //curve: 1, 
            },
            mapAnimation: 'flyTo',
            rotateAnimation: true,
            callback: '',
            onChapterEnter: 
            [
                {
                    layer: 'sing',
                    opacity: 1,
                    duration: 3000
                },

                {
                    layer: 'places',
                    opacity: 1,
                    duration: 3000
                },

            ],
            onChapterExit: 
            [
                {
                    layer: 'places',
                    opacity: 0,
                    duration: 3000
                },
            ]
        },

        // The first voyage
        {
            id: 'first',
            alignment: 'right',
            hidden: false,
            title: 'The First Voyage (1405–07)',
            image: 'https://raw.githubusercontent.com/sherlkk/DVG/main/first.jpg',
            description: 'Zheng was selected by the emperor to become commander in chief of a series of missions to the Western Oceans. He set sail from Liujiagan Port in Taicang, Jiangsu Province, in 1405, commanding 208 vessels total, including 62 treasure ships, and more than 27,800 crew members. The fleet visited Champa (now in southern Vietnam), Malacca (Melaka), and the island of Java, and then travelled through the Indian Ocean to Calicut (Kozhikode) on the Malabar Coast of India and Ceylon (Sri Lanka). Zheng He returned to China in 1407.<br/><n/><br/>Passed: Champa (today central and southern Vietnam), Java (one of the Greater Sunda Islands in Indonesia), Sumatra (a Sunda Island of western Indonesia), Malacca (the southern region of the Malay Peninsula), Ceylon (Sri Lanka), Cochin (India), Calicut (India), etc.',
            location: {
                center: { lon: 118.51741, lat: 13.81766 },
                zoom: 3.76,
                pitch: 60.00,
                bearing: -27.32,
                // flyTo additional controls-
                // These options control the flight curve, making it move
                // slowly and zoom out almost completely before starting
                // to pan.
                speed: 0.5, // make the flying slow
                curve: 1, // change the speed at which it zooms out
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: 
            [
                {
                    layer: 'lanka',
                    opacity: 1,
                    duration: 5000
                }
            ],
            onChapterExit: []
        },

        // The second and third voyage.
        {
            id: 'second',
            alignment: 'right',
            hidden: false,
            title: 'The Second & Third Voyage (1408–11)',
            image: 'https://raw.githubusercontent.com/sherlkk/DVG/main/second.jpg',
            description: 'On his second voyage, in 1408–09, Zheng He followed the same route as his first, visiting Calicut, stopping as well in Chochin (Kochi) along the coast to the south. In addition, they visited Siam (Thailand). <br/><n/><br/> In October 1409, Zheng He set out on his third voyage. Once again, he stopped in places like Java, Sumatra, and visited ports on the coast of Siam (Thailand) and the Malay Peninsula.<br/><n/><br/> Passed: Champa (Vietnam), Java (Indonesia), Sumatra (Indonesia), Malacca (Malay Peninsula), Ceylon (Sri Lanka) , Siam (Thailand), India (including: Quilon, Cochin, Calicut, Kaya, Coimbatore, Puttanpur), etc.',
            location: {
                // center: { lon: 113.14524, lat: 9.39918 },
                // zoom: 3.33,
                // pitch: 52.50,
                // bearing: -16.00,
                center: { lon: 93.35777, lat: 2.01638 },
                zoom: 3.84,
                pitch: 60.00,
                bearing: 91.90,
                speed: 0.05, 
                curve: 0.2, 
            },
            mapAnimation: 'flyTo',
            rotateAnimation: true,
            callback: '',
            onChapterEnter: 
            [
                {
                    layer: 'second',
                    opacity: 1,
                    duration: 10000
                },

                {
                    layer: 'one',
                    opacity: 1,
                    duration: 7000
                },

                {
                    layer: 'places',
                    opacity: 1,
                    duration: 5000
                },
            ],
            onChapterExit: 
            [
                {
                    layer: 'places',
                    opacity: 0,
                    duration: 5000
                },

            ]
        },

        //The fourth voyage.
        {
            id: 'fourth',
            alignment: 'right',
            hidden: false,
            title: 'The Fourth Voyage (1413–15)',
            image: 'https://raw.githubusercontent.com/sherlkk/DVG/main/fourth.jpg',
            description: 'On his fourth voyage, Zheng He left China in 1413. After stopping at the principal ports of Asia, he proceeded westward from India to Hormuz. A detachment of the fleet cruised southward down the coast of Arabia, visiting Dhofar (Oman) and Aden (Yemen). On his return to China in 1415, Zheng He brought the envoys of more than 30 states of South and Southeast Asia to exchange and communicate with the Chinese emperor. <br/><n/><br/> Passed: Champa (Vietnam), Java (Indonesia), Palembang (Indonesia), Malacca (Malaysia), Sumatra (Indonesia), Ceylon (Sri Lanka), India, Hormuz (Iran), Muscat (Oman), Dhofar (Oman), etc.',
            location: {
                // center: { lon: 66.92085, lat: 8.19042 },
                // zoom: 3.51,
                // pitch: 57.00,
                // bearing: 51.52,
                center: { lon: 57.44413, lat: 4.80285 },
                zoom: 3.71,
                pitch: 60.00,
                bearing: 95.94,
                speed: 0.5, 
                curve: 1, 
            },
            mapAnimation: 'flyTo',
            rotateAnimation: true,
            callback: '',
            onChapterEnter: 
            [
                {
                    layer: 'fourthh',
                    opacity: 1,
                    duration: 10000
                },
                {
                    layer: 'dot',
                    opacity: 1,
                    duration: 5000
                },
                {
                    layer: 'fourth',
                    opacity: 1,
                    duration: 10000
                },
            ],
            onChapterExit: []
        },

        // The fifth and sixth voyage
        {
            id: 'fifth',
            alignment: 'right',
            hidden: false,
            title: 'The Fifth (1417–19) & Sixth (1421-22) Voyage',
            image: 'https://raw.githubusercontent.com/sherlkk/DVG/main/fifth.jpg',
            description: 'The fifth voyage was undertaken mainly to return foreign envoys to their homelands. Zheng He retraces his previous routes, including stops in Java, Sumatra, and eastern Africa.<br/><n/><br/>The sixth voyage was launched in 1421 to take home the foreign emissaries from China as well. Again, he visited Southeast Asia, India, Arabia, and Africa. In 1424, the Yongle emperor died. In a shift of policy, his successor, the Hongxi emperor, suspended naval expeditions abroad. Zheng He was appointed garrison commander in Nanjing, with the task of disbanding his troops.<br/><n/><br/> Passed: Champa (Vietnam), Java (Indonesia), Malacca (Malaysia), Sumatra (Indonesia), Ceylon (Sri Lanka), India, Hormuz (Iran), Muscat (Oman), Dhofar (Oman), Somalia, Kenya, etc.',
            location: {
                center: { lon: 77.45527, lat: 22.50866 },
                zoom: 3.11,
                pitch: 60.00,
                bearing: -92.06,
                speed: 0.3, 
                curve: 0.5, 
            },
            mapAnimation: 'flyTo',
            rotateAnimation: true,
            callback: '',
            onChapterEnter: 
            [
                {
                    layer: '56',
                    opacity: 1,
                    duration: 10000
                },
                {
                    layer: 'places',
                    opacity: 1,
                    duration: 5000
                },
            ],
            onChapterExit: 
            []
        },

        //The last one
        {
            id: 'seventh',
            alignment: 'right',
            hidden: false,
            title: 'The Seventh Voyage (1431–33)',
            image: 'https://raw.githubusercontent.com/sherlkk/DVG/main/seventh.jpg',
            description: 'All voyages are suspended until 1431, when Zheng He embarks on a seventh voyage. He visited the states of Southeast Asia, the coast of India, the Persian Gulf, the Red Sea, and the east coast of Africa. <br/><n/><br/>Spring 1433<br/>Zheng He dies in Calicut (now Kozhikode), India, while on the seventh voyage. The fleet returns to China and never sets sail again. His tomb is built in Nanjing, China, where it remains today.<br/><n/><br/> Passed: Champa (Vietnam), Java (Indonesia), Malacca (Malaysia), Sumatra (Indonesia), Ceylon (Sri Lanka), India, Hormuz (Iran), Muscat (Oman), Dhofar (Oman), Mecca (Saudi Arabia), Somalia, Kenya, etc.',
            location: {
                // center: { lon: 55.70148, lat: 2.40166 },
                // zoom: 3.84,
                // pitch: 60.00,
                // bearing: 36.80,
                center: { lon: 57.58026, lat: 12.27575 },
                zoom: 3.59,
                pitch: 55.00,
                bearing: -50.04,
                speed: 0.3, 
                curve: 0.5, 
            },
            mapAnimation: 'flyTo',
            rotateAnimation: true,
            callback: '',
            onChapterEnter: 
            [
                {
                    layer: 'east',
                    opacity: 1,
                    duration: 5000
                },

                {
                    layer: 'ffull',
                    opacity: 1,
                    duration: 5000
                },
				
				{
                    layer: 'labels',
                    opacity: 1,
                    duration: 5000
                },

                {
                    layer: 'points',
                    opacity: 1,
                    duration: 5000
                },


            ],
            onChapterExit: []
        },

        //Set the end view
        {
            id: 'end',
            alignment: 'centre',
            hidden: true,
            location: {
                center: { lon: 56.20611, lat: 18.66617 },
                zoom: 2.8,
                pitch: 0.00,
                bearing: 0.00,
                speed: 0.3, 
                curve: 0.5, 
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                {
                    layer: 'ffull',
                    opacity: 1,
                    duration: 3000
                },

                // {
                //     layer: 'hover',
                //     opacity: 1,
                //     duration: 3000
                // },
            ],
        },
    ]
};
