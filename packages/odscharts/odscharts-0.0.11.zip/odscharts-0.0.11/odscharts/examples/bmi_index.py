
"""
This example demonstrates the proper use of project: odscharts

BMI data from: http://knoema.com/WHOGDOBMIMay/who-global-database-on-body-mass-index-bmi
"""

from odscharts.spreadsheet import SpreadSheet

mySprSht = SpreadSheet()

aussieLL = [
['Year','Normal Aus','Overweight Aus','Underweight Aus'],
['','%','%','%'],
[1990, '', '', ''],
[1991, '', '', ''],
[1992, '', '', ''],
[1993, '', '', ''],
[1994, '', '', ''],
[1995, '', 57.3, ''],
[1996, '', 57.3, ''],
[1999, 39.2, 59.8, 1],
[2000, 39.2, 59.8, 1],
[2001, '', 46.2, ''],
[2004, '', 49, ''],
[2005, '', 49, '']]


mySprSht.add_sheet('Aussie_Data', aussieLL)
mySprSht.add_scatter( 'Aussie_Plot', 'Aussie_Data',
                          title='Australian BMI', xlabel='Year', 
                          ylabel='Percent of Population',
                          xcol=1,
                          ycolL=[2,3,4])
usaLL = [
['Year','Normal USA','Overweight USA','Underweight USA'],
['','%','%','%'],
[1990, 42.5, 55, 2.5],
[1991, 42.5, 55, 2.5],
[1992, 42.5, 55, 2.5],
[1993, 42.5, 55, 2.5],
[1994, 42.5, 55, 2.5],
[1995, 61.9, 36.7, 1.4],
[1999, 35.1, 62.5, 2.4],
[2000, 39.7, 58.3, 2.1],
[2001, 35.7, 59.2, 2.4],
[2002, 35.7, 59.2, 2.4],
[2003, '', 54.4, ''],
[2004, '', 66.3, ''],
[2005, '', 66.9, ''],
[2006, '', 66.9, '']]

mySprSht.add_sheet('USA_Data', usaLL)
mySprSht.add_scatter( 'USA_Plot', 'USA_Data',
                          title='United States BMI', xlabel='Year', 
                          ylabel='Percent of Population',
                          xcol=1,
                          ycolL=[2,3,4])

mySprSht.add_scatter( 'Combo_Plot', 'USA_Data',
                          title='USA and Australian BMI', xlabel='Year', 
                          ylabel='Percent of Population',
                          xcol=1,
                          ycolL=[2,3,4],
                          showMarkerL=[0,],
                          colorL=['r','g','b'])

mySprSht.add_curve('Combo_Plot', 'Aussie_Data', 
                    xcol=1,
                    ycolL=[2,3,4],
                    showMarkerL=[0,],
                    lineStyleL=[1,],
                    lineThkL=[2,],
                    colorL=['r','g','b'])


mySprSht.add_scatter( 'Combo2_Plot', 'Aussie_Data',
                       title='Australian and USA BMI', xlabel='Year', 
                       ylabel='Percent of Aussie Population',
                       y2label='Percent of USA Population',
                       xcol=1,
                       ycolL=[2,3,4],
                       showMarkerL=[0,],
                       lineStyleL=[1,],
                       lineThkL=[2,],
                       colorL=['r','g','b'])
                          
mySprSht.add_curve('Combo2_Plot', 'USA_Data', 
                    xcol=1,
                    ycol2L=[2,3,4],
                    showMarker2L=[0,],
                    lineThk2L=[2,],
                    color2L=['r','g','b'])

mySprSht.setYrange(  ymin=0, ymax=80, plot_sheetname=None)
mySprSht.setY2range( ymin=0, ymax=80, plot_sheetname=None)
mySprSht.save( filename='bmi_index.ods', launch=True )
