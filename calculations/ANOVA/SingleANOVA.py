import csv
from loguru import logger

from calculations.ANOVA.types import SANOVA


class SinglANOVA:
    def __init__(self, data: str, ndigits: int=3):
        self.data = list(csv.reader(data.strip().split('\n'), delimiter=',', quoting=csv.QUOTE_NONNUMERIC, skipinitialspace=True))
        self.ndigits = ndigits
        self.Qj = []
        self.Tj = []
        self.Tj2 = []


    def _round(self, number) -> float:
        return round(number, self.ndigits)
    

    def _averages(self) -> list[float]:
        data = self.data[2:]
        size = len(data)
        averages = []

        for i in range(size-1):
            col = []
            for j in range(size-1):
                if data[j][i] != '':
                    col.append(data[j][i])
            averages.append(self._round(sum(col) / len(col)))
        
        overall_avarage = self._round(sum(averages) / len(averages))
        
        logger.info(f"{averages=}")
        logger.info(f"{overall_avarage=}")
        return overall_avarage, averages


    def _data_minus_averages(self, averages) -> list[list[float]]:
        data = self.data[2:]
        size = len(data)
        calculate_data = []
        
        for i in range(size-1):
            row = []
            for j in range(size-1):
                if data[i][j] != '':
                    number_minus_avr = self._round(data[i][j] - averages[i])
                    row.append(number_minus_avr)
                else:
                    row.append('')
            calculate_data.append(row)
        self.data_minus_averages = calculate_data.copy()
        
        calculate_data.insert(0, self.data[0])
        calculate_data.insert(1, self.data[1])
        return calculate_data


    def _square_data(self, data: list[float]):
        size = len(data)
        logger.info(f'{data=}')
        square_data = []
        Qj = []
        Tj = []
        for i in range(size-1):
            row = []
            for j in range(size-1):
                if data[i][j] != '':
                    square = data[i][j] ** 2
                    row.append(self._round(square))
                    Qj.append(square)
                    Tj.append(data[j][i])
            self.Tj.append(self._round(sum(Tj)))
            self.Qj.append(self._round(sum(Qj)))
            square_data.append(row)
        self.Tj2 = [self._round(x ** 2) for x in self.Tj]

        Qj_table = []
        Tj_table = []
        Tj2_table = []
        for i in range(len(self.Tj)):
            Qj_table.append('')
            Qj_table.append(self.Qj[i])
            Tj_table.append(self.Tj[i])
            Tj_table.append('')
            Tj2_table.append(self.Tj2[i])
            Tj2_table.append('')

        return square_data, Qj_table, Tj_table, Tj2_table


    def _float_to_int(self):
        pass


    def calculate(self) -> SANOVA:
        logger.debug(f"calculate!")
        overall_average, group_averages = self._averages()
        data_minus_avr = self._data_minus_averages(group_averages)
        square_data, Qj, Tj, Tj2 = self._square_data(self.data_minus_averages)

        return SANOVA(
            data=self.data,
            data_minus_avr=data_minus_avr,
            square_data=square_data,
            group_averages=group_averages,
            overall_average=overall_average,
            Qj=Qj,
            Tj=Tj,
            Tj2=Tj2
            )