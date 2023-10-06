from fastapi import APIRouter
from ...models import Statistic
from ...calculations.distributions.uniform import uniform
from ...calculations.distributions.normal import normal
from ...calculations.distributions.exponential import exponential
from ...models import ComparisonCDF
from ...calculations.distributions.compare_cdf import compare_cdf

router = APIRouter(prefix='/destribution')


@router.post('/calculate')
async def calculate_distribution(sampleSize: int, distribution_type: str) -> Statistic:
    match distribution_type:
        case "uniform":
            return Statistic(*uniform(sampleSize))
        case "normal":
            return Statistic(*normal(sampleSize))
        case "exponential":
            return Statistic(*exponential(sampleSize))



@router.post('/evaluate-equality-cdf')
async def evaluate_equality_cdf(
        n: int,
        m: int,
        n_distribution: str,
        m_distribution: str,
        a: int) -> ComparisonCDF:
    c = compare_cdf(n, m, n_distribution, m_distribution, a)
    return ComparisonCDF(*c)
    
