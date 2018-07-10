define(function( require, exports, module ) {

	require( 'highcharts' );

	$(function(){

		$('#graphic').highcharts({
            colors: ['#ff9d2c','#66cc22'],
            credits:{
                enabled:false
            },            
            chart: {
                type: 'line',
                marginLeft: 30
            },
            legend:{
               verticalAlign: 'top' 
           },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                gridLineWidth: 1,
                lineColor: '#ddd',
                categories: ['02-01', '02-02', '02-03', '02-04', '02-05','02-06','02-07'],
                title: {
                	text: '单位(月-日)'
                    // style: {
                    //     color: '#666',
                    //     fontFamily: '宋体'
                    // }
                },
                labels:{
                    style: {
                        color: '#666',
                        // fontSize: '12px',
                        // fontFamily: '宋体'
                    }
                }
            },
            yAxis: {
                title: {
                    text: ''
                },
                labels: {
                    // formatter: function() {
                    //     // return this.value / 10000 +'万';
                    // },
                    style: {
                        color: '#666',
                        // fontSize: '12px',
                        // fontFamily: '宋体'
                    },
                    x: -5
                },
                min: 0
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true// 是否显示节点数字
                    },
                    enableMouseTracking: true// 鼠标移动上去是否显示提示框
                },
                series: {
                    marker: {
                        radius: 3,  //曲线点半径，默认是4
                        symbol: 'circle' //曲线点类型："circle", "square", "diamond", "triangle","triangle-down"，默认是"circle"
                    }
                }
            },
            series: [{
                name: '单位(元/公斤)',
                data: [200.00, 122.02, 123.04, 128.00, 134.04,122.02, 123.04]
            }]
        });

	});


});