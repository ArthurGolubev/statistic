from fastapi import APIRouter
from ...models import ProcessedInputData
from ...models import CalculatedANOVA
from ...models import InputData
from ...models import InputParametrs
from ...calculations.ANOVA.SingleANOVA import SinglANOVA



router = APIRouter(prefix='/anova')


@router.post('/input-data-from-file')
async def read_data(data: InputData) -> ProcessedInputData:
    return ProcessedInputData(*SinglANOVA(data=data).open_csv())


@router.post('/calculate-single-anova')
async def calculate_single_anova(
        data: InputParametrs,
        averages: list[str],
        prcision: int = 2,
        alpha: float = 0.05) -> CalculatedANOVA:
    
    return CalculatedANOVA(*SinglANOVA(data=data).calculate(
        averages=averages, precision=prcision, alpha=alpha))
