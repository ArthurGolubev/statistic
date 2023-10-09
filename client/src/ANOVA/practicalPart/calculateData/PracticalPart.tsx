import * as React from "react"
import { Description } from "./Description"
import { Table2 } from "./Table2"
import { Step1 } from "./Step1"
import { Table3 } from "./Table3"
import { Step2 } from "./Step2"
import { Plot1 } from "./Plot1"
import { Conclusion } from "./Conclusion"
import { BibliographicList } from "./BibliographicList"
import { useFirstStepData } from "../stepOne/FirstStepStore"
import { useSecondStep } from "./SecondStepStore"
import { SendData } from "../stepOne/SendData"
import { useInterface } from "../../../interfaceStore"



export const PracticalPart = () => {
    const group_averages = useFirstStepData().group_averages
    const data_minus_avr = useSecondStep().data_minus_avr
    const print = useInterface().print


    return <div>
            {
                group_averages.length > 0 && <div>
                    <h5 className="mt-5 mb-5" style={{pageBreakBefore: 'always'}}>Практическая часть</h5>
                    <Description />
                    <Table2 />
                    {!print.view && <SendData />}
                </div>
            }
            {
                data_minus_avr?.length > 0 && <div>
                    <Step1 />
                    <Table3 />
                    <Step2 />
                    <Plot1 />
                    <Conclusion />
                    <BibliographicList />
                </div>
            }
    </div>
}