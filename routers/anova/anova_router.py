from fastapi import APIRouter
from models import ProcessedInputData
from models import CalculatedANOVA
from calculations.ANOVA.SingleANOVA import SinglANOVA
from loguru import logger



router = APIRouter(prefix='/anova')


@router.post('/input-data-from-file')
async def read_data(factors: list[str], data: list[list[float]]) -> ProcessedInputData:
    logger.info(f'\n\n{factors=}\n\n')
    return SinglANOVA(data=data, factors=factors).open_csv()


@router.post('/calculate-single-anova')
async def calculate_single_anova(
        data: list[list[float]],
        averages: list[float],
        factors: list[str],
        precision: int = 2,
        alpha: float = 0.05) -> CalculatedANOVA:
    
    return SinglANOVA(data=data, factors=factors).calculate(
        averages=averages, precision=precision, alpha=alpha)
