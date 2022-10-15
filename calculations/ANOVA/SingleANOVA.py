import csv
from loguru import logger
from scipy import stats

from calculations.ANOVA.types import SANOVA, OpenCSV


class SinglANOVA:
    def __init__(self, data: str, precision: int=5, alpha: float=0.05):
        input_csv = list(csv.reader(data.strip().split('\n'), delimiter=',', quoting=csv.QUOTE_NONNUMERIC, skipinitialspace=True))

        self.description = input_csv[0][0]
        self.header1 = input_csv[0][1]
        self.header2 = input_csv[0][2]
        self.factors = input_csv[1]
        self.data = input_csv[2:]
        self.alpha = alpha
        self.precision = precision
        self.to_integer = False




    def _to_integer(self):
        data = self.data
        rows = len(data)
        cols = len(data[0])

        
        
        # находим максимальное количество знаков после запятой
        max_percision = 0
        for i in range(rows):
            for j in range(cols):
                if data[i][j] != '':
                    if str(data[i][j]).split(".")[1] != '0':
                        max_percision = max(len(str(data[i][j]).split(".")[1]), max_percision)
        self.to_integer = True if max_percision else False
        # перехожу к целым числым
        for i in range(rows):
            for j in range(cols):
                if data[i][j] != '':
                    self.data[i][j] = data[i][j] * (10 ** max_percision)
        self.y_11 = data[0][0]
        self.y_21 = data[1][0]


    def _round(self, number) -> float:
        return round(number, ndigits=self.precision)




    def _group_averages(self, data: list[str | float]):
        logger.success(f"{data=}")
        rows = len(data)
        cols = len(data[0])
        averages = []

        for i in range(cols):
            col = []
            for j in range(rows):
                if data[j][i] != '':
                    col.append(data[j][i])
            averages.append(self._round(sum(col) / len(col)))
        
        logger.success(f"{averages=}")
        return averages




    def _overall_averages(self, averages: list[int]) -> int:
        logger.critical(f"{sum(averages)=}")
        logger.critical(f"{len(averages)=}")
        logger.critical(f"{sum(averages) / len(averages)=}")
        return self._round(sum(averages) / len(averages))




    def _data_minus_averages(self, data: list[str | float], overall_average: float) -> list[list[float]]:
        data = self.data
        rows = len(data)
        cols = len(data[0])
        self.n = sum([len([x1 for x1 in x if x1 != '']) for x in data])
        calculate_data = []

        for i in range(cols):
            col = []
            for j in range(rows):
                if data[j][i] != '':
                    number_minus_avr = self._round(data[j][i] - overall_average)
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
            y_ij = []
            y_ij_2 = []
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




    def  _s_total(self, sum_Qj: float, sum_Tj: float):
        s_total = sum_Qj - (sum_Tj ** 2) / self.n
        return self._round(s_total)



    
    def _s_fact(self, sum_Tj: float, Tj2: float):
        rows = len(self.data)
        cols = len(self.data[0])
        column_n = []
        # сколько наблюдений в колонке
        for i in range(cols):
            n = 0
            for j in range(rows):
                if self.data[j][i] != '':
                    n += 1
            column_n.append(n)
        sorted_c = sorted(column_n)
        equivalence_levels_F = sorted_c[-1] == sorted_c[1]
        logger.success(f"{column_n=}")

        if equivalence_levels_F:
            # TODO тут
            logger.success(f"1")
            s_fact = 10
        else:
            logger.success(f"2")
            s = []
            for i in range(len(Tj2)):
                s.append(Tj2[i] / column_n[i])
            # logger.success(f"{Tj2=}")
            # logger.success(f"{column_n=}")
            # logger.success(f"{s=}")
            s_fact = self._round(sum(s) - (sum_Tj ** 2) / self.n)
        return equivalence_levels_F, s_fact, column_n




    def _f_observation(self, s2_fact: float, s2_remainder):
        return self._round(s2_fact / s2_remainder)




    def _s2_remainder(self, equivalence_levels_F: bool, s_remainder: float):
        # TODO тут равное кол-во факторов
        if equivalence_levels_F:
            s2_remainder = s_remainder / (self.n - len(self.factors))
        else:
            s2_remainder = s_remainder / (self.n - len(self.factors))
        return self._round(s2_remainder)




    def _f_crit(self, equivalence_levels_F: bool):
        # TODO тут равное кол-во факторов
        if equivalence_levels_F:
            dfn = len(self.factors) - 1
            dfd = self.n - len(self.factors)
            logger.success(f"{dfn=}")
            logger.success(f"{dfd=}")
            return self._round(stats.f.ppf(q=1-self.alpha, dfn=dfn, dfd=dfd))
        else:
            dfn = len(self.factors) - 1
            dfd = self.n - len(self.factors)
            logger.success(f"{dfn=}")
            logger.success(f"{dfd=}")
            return self._round(stats.f.ppf(q=1-self.alpha, dfn=dfn, dfd=dfd))

    def _plot_1(self, group_averages: list[float]):
        data = self.data

        error_max = []
        error_min = []
        dots_x = []
        dots_y = []
        for i in range(len(data[0])):
            col = []
            for j in range(len(data)):
                if data[j][i] != '':
                    dots_x.append(self.factors[i])
                    dots_y.append(data[j][i])
                    col.append(data[j][i])
            
            error_max.append(max(col) - group_averages[i])
            error_min.append(group_averages[i] - min(col))

        return error_max, error_min, dots_x, dots_y



    def open_csv(self):
        logger.success('WER')
        group_averages = self._group_averages(self.data)
        error_max, error_min, dots_x, dots_y = self._plot_1(group_averages)

        return OpenCSV(
            description=self.description,
            header1=self.header1,
            header2=self.header2,
            factors=self.factors,
            data=self.data,
            group_averages=group_averages,
            error_max=error_max,
            error_min=error_min,
            dots_x=dots_x,
            dots_y=dots_y
        )




    def calculate(self, averages: list[str]) -> SANOVA:
        self._to_integer()
        overall_average = self._overall_averages(self._group_averages(self.data))
        data_minus_averages = self._data_minus_averages(self.data, overall_average)
        # data_minus_averages = self._data_minus_averages(self.data, 138)
        Qj, Tj, Tj2 = self._calculate_Qj_Tj_Tj2(data_minus_averages)
        Qj_table, Tj_table, Tj2_table, data_minus_avr_and_square_table, y_headers = self._format_for_table(Qj, Tj, Tj2, data_minus_averages)

        sum_Qj=self._round(sum(Qj))
        sum_Tj=self._round(sum(Tj))
        sum_Tj2=self._round(sum(Tj2))

        s_total = self._s_total(sum_Qj, sum_Tj)
        equivalence_levels_F, s_fact, column_n = self._s_fact(sum_Tj, Tj2)
        s_remainder = self._round(s_total - s_fact)
        s2_fact = self._round(s_fact / (len(self.factors) - 1))
        s2_remainder = self._s2_remainder(equivalence_levels_F, s_remainder)
        f_observation = self._f_observation(s2_fact, s2_remainder)
        f_crit = self._f_crit(equivalence_levels_F)
        logger.debug(f"{f_crit=}")
        logger.debug(f"{f_observation=}")
        h0 = f_crit > f_observation

        logger.success(f"{h0=}")

        return SANOVA(
            y_headers=y_headers,
            to_integer=self.to_integer,
            y_11=self.y_11,
            y_21=self.y_21,
            data_minus_avr_and_square = data_minus_avr_and_square_table,
            overall_average=overall_average,
            Qj=Qj_table,
            Tj=Tj_table,
            Tj2=Tj2_table,
            equivalence_levels_F=equivalence_levels_F,
            sum_Qj=sum_Qj,
            sum_Tj=sum_Tj,
            sum_Tj2=sum_Tj2,
            s_total=s_total,
            n=self.n,
            s_fact=s_fact,
            column_n=column_n,
            s_remainder=s_remainder,
            s2_fact=s2_fact,
            s2_remainder=s2_remainder,
            f_observation=f_observation,
            f_crit=f_crit,
            h0=h0
            )