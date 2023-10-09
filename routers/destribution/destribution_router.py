from fastapi import APIRouter
from models import Statistic
from calculations.distributions.uniform import uniform
from calculations.distributions.normal import normal
from calculations.distributions.exponential import exponential
from models import ComparisonCDF
from calculations.distributions.compare_cdf import compare_cdf
from loguru import logger
from models import InputDestribution
from models import InputEvaluateEqualityCDF

router = APIRouter(prefix='/destribution')


@router.post('/calculate')
async def calculate_distribution(body: InputDestribution) -> Statistic:
    match body.distribution_type:
        case "uniform":
            return uniform(body.sample_size)
        case "normal":
            return normal(body.sample_size)
        case "exponential":
            return exponential(body.sample_size)



@router.post('/evaluate-equality-cdf')
async def evaluate_equality_cdf(body: InputEvaluateEqualityCDF) -> ComparisonCDF:
    return compare_cdf(body.n, body.m, body.n_distribution, body.m_distribution, body.a)