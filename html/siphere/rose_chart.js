        // based ready dom, initialize echarts instance 
		var myChart = echarts.init(document.getElementById('main'));

        // Specify configurations and data graphs 
        var option = {
            // 
            textStyle: {
                fontcolor:'white',
              },
            color: [ 
            '#f7ebe8',
            '#f8e3dd',
            '#f9dad3',
            '#fad2c8',
            '#fac9be',
            '#fac1b4',
            '#fab8aa',
            '#f9b0a1',
            '#f9a797',
            '#f89e8e',
            '#f79685',
            '#f58d7c',
            '#f48473',
            '#f27a6b',
            '#f17162',
            '#ef675a',
            '#ec5d52',
            '#ea524a',
            '#e84642',
            '#e5383b',
            '#CF292B',
            '#BA181B'
        ],
    title : {
        text: 'Top 20 countries with nonstop flights from China',
        subtext: 'Fictitious',
        x:'left',
        textStyle:{
            // fontSize: 18,//字体大小
            color: '#ffffff99'//字体颜色
        },
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        x : 'center',
        y : 'bottom',
        fontsize: 10,
    },

    toolbox: {
        show : false,
        feature : {
            mark : {show: true},
            // dataView : {show: true, readOnly: false},
            magicType : {
                show: true,
                type: ['pie', 'funnel'],
                option: {
                    funnel: {
                        x: '25%',
                        width: '50%',
                        funnelAlign: 'left',
                        max: 1548
                    }
                }
            },
            // restore : {show: true},
            // saveAsImage : {show: true}
        }
    },
    calculable : true,
    series : [
        {
            name:'count of flights',
            type:'pie',
            radius : [50, 150],
            center : ['25%', 200],
            roseType : 'area',
            itemStyle: {
                normal: {
                    label: {
                        textStyle: {
                          color:'#ffffff99',
                            fontSize: 14,
                            fontWeight:'bolder'
                        }
                    },

                }
            },
            data:[
                {name:"	France	",value:	6	},
                {name:"	Italy	",value:	6	},
                {name:"	United Kingdom	",value:	6	},
                {name:"	Qatar	",value:	7	},
                {name:"	Myanmar	",value:	8	},
                {name:"	Netherlands	",value:	8	},
                {name:"	Canada	",value:	10	},
                {name:"	United Arab Emirates	",value:	10	},
                {name:"	Cambodia	",value:	11	},
                {name:"	Philippines	",value:	11	},
                {name:"	Germany	",value:	12	},
                {name:"	India	",value:	12	},
                {name:"	Indonesia	",value:	14	},
                {name:"	Australia	",value:	18	},
                {name:"	Malaysia	",value:	22	},
                {name:"	Singapore	",value:	25	},
                {name:"	Vietnam	",value:	26	},
                {name:"	United States of America	",value:	31	},
                {name:"	Russia	",value:	34	},
                {name:"	Thailand	",value:	53	},
                {name:"	South Korea	",value:	77	},
                {name:"	Japan	",value:	88	}                
            ]
        }
    ]
};

		// Use just the specified configurations and data charts. 
		myChart.setOption(option);