import csv
from loguru import logger

from calculations.ANOVA.types import SANOVA, OpenCSV


class SinglANOVA:
    def __init__(self, data: str, precision: int=1):
        input_csv = list(csv.reader(data.strip().split('\n'), delimiter=',', quoting=csv.QUOTE_NONNUMERIC, skipinitialspace=True))

        self.description = input_csv[0][0]
        self.header = input_csv[0][1]
        self.factors = input_csv[1]
        self.data = input_csv[2:]
        self.precision = precision




    def _round(self, number) -> float:
        return round(number, ndigits=self.precision)




    def _group_averages(self, data: list[str | float]):
        rows = len(data)
        cols = len(data[0])
        averages = []

        for i in range(cols):
            col = []
            for j in range(rows):
                if data[j][i] != '':
                    col.append(data[j][i])
            averages.append(self._round(sum(col) / len(col)))
        
        return averages




    def _overall_averages(self, averages: list[int]) -> int:
        return self._round(sum(averages) / len(averages))




    def _data_minus_averages(self, data: list[str | float], averages: list[float]) -> list[list[float]]:
        data = self.data
        rows = len(data)
        cols = len(data[0])
        calculate_data = []

        for i in range(cols):
            col = []
            for j in range(rows):
                if data[j][i] != '':
                    number_minus_avr = self._round(data[j][i] - averages[i])
                    col.append(number_minus_avr)
                else:
                    col.append('')
            calculate_data.append(col)

        rows = len(calculate_data)
        cols = len(calculate_data[0])
        flip_matrix = []
        for i in range(cols):
            row = []
            for j in range(rows):
                row.append(calculate_data[j][i])
            flip_matrix.append(row)

        return flip_matrix




    def _calculate_Qj_Tj_Tj2(self, data: list[str | int]):
        rows = len(data)
        cols = len(data[0])
        y_ij_2 = []
        y_ij = []
        
        Qj = []
        Tj = []

        # проход по всем элементам колонки
        for i in range(cols):
            col = []
            for j in range(rows):
                if data[j][i] != '':
                    square = data[j][i] ** 2
                    col.append(self._round(square))
                    y_ij_2.append(square)
                    y_ij.append(data[j][i])
            Tj.append(self._round(sum(y_ij)))
            Qj.append(self._round(sum(y_ij_2)))
        Tj2 = [self._round(x ** 2) for x in Tj]
        return Qj, Tj, Tj2




    def _format_for_table(self, Qj, Tj, Tj2, data_minus_averages):
        data_minus_avrages_and_square = [[self._round(col ** 2) if col != '' else '' for col in row] for row in data_minus_averages]
        rows = len(data_minus_averages)
        cols = len(data_minus_averages[0])
        Qj_table = []
        Tj_table = []
        Tj2_table = []
        data_minus_avrages_and_square_table = []
        y_headers_tables = []
        
        for i in range(len(Tj)):
            Qj_table.append('')
            Qj_table.append(Qj[i])
            Tj_table.append(Tj[i])
            Tj_table.append('')
            Tj2_table.append(Tj2[i])
            Tj2_table.append('')
        for i in range(rows):
            row = []
            for j in range(cols):
                row.append(data_minus_averages[i][j])
                row.append(data_minus_avrages_and_square[i][j])
            data_minus_avrages_and_square_table.append(row)
        for i in range(cols):
            y_headers_tables.append("x_{j" + str(i +1) + "}")
            y_headers_tables.append("x^2_{j" + str(i +1) + "}")
        return Qj_table, Tj_table, Tj2_table, data_minus_avrages_and_square_table, y_headers_tables




    def open_csv(self):
        logger.success('WER')
        group_averages = self._group_averages(self.data)

        return OpenCSV(
            description=self.description,
            header=self.header,
            factors=self.factors,
            data=self.data,
            group_averages=group_averages,
        )




    def calculate(self, averages: list[str]) -> SANOVA:
        overall_average = self._overall_averages(averages)
        data_minus_averages = self._data_minus_averages(self.data, averages)
        Qj, Tj, Tj2 = self._calculate_Qj_Tj_Tj2(data_minus_averages)
        Qj_table, Tj_table, Tj2_table, data_minus_avr_and_square_table, y_headers = self._format_for_table(Qj, Tj, Tj2, data_minus_averages)

        return SANOVA(
            y_headers=y_headers,
            data_minus_avr_and_square = data_minus_avr_and_square_table,
            overall_average=overall_average,
            Qj=Qj_table,
            Tj=Tj_table,
            Tj2=Tj2_table
            )