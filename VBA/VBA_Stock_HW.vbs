sub StockVolume():

dim ticker as string

dim total_stock as double
total_stock = 0

dim summary_table_row as integer



summary_table_row = 2

lastrow = cells(rows.count,1).End(xlUp).Row

for r = 2 to lastrow

    if cells(r + 1, 1).value <> cells(r, 1) then

    ticker = cells(r, 1).value

    total_stock = total_stock + cells(r, 7).value

    range("I" & summary_table_row).value = ticker

    range("J" & summary_table_row).value = total_stock

    summary_table_row = summary_table_row + 1

    total_stock = 0

    else

    total_stock = total_stock + cells(r, 7).value

    	
    End If
next r

end sub