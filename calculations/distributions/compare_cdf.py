from calculations.distributions.exponential import exponential
from calculations.distributions.normal import normal
from calculations.distributions.uniform import uniform
from calculations.types import CompareCDF, Statistic



def compare_cdf(n: int, m: int, n_distribution: str, m_distribution: str, a: int):
    def cdf(distribution_type: str, sampleSize: int) -> Statistic:
            if distribution_type == 'uniform':
                return uniform(sampleSize)
            elif distribution_type == 'normal':
                return normal(sampleSize)
            elif distribution_type == 'exponential':
                return exponential(sampleSize)
            
    cdf_1 = cdf(n_distribution, n)
    cdf_2 = cdf(m_distribution, m)

    #  TODO Сравнить cdf_1 и cdf_2
    return CompareCDF(cdf_1=cdf_1, cdf_2=cdf_2)