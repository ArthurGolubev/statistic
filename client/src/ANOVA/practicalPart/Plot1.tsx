import * as React from "react"
import Plot from "react-plotly.js"


export const Plot1 = () => {
    
    return <Plot data={[
            {
                // x: state.array,
                // y: state.cdf,
                type: 'scatter',
                mode: 'lines+markers',
            }
        ]}
        layout={{
            // title: state.title,
            xaxis: {
                title: "x"
            },
            yaxis: {
                title: "P(x)"
            }
        }}
    />
}