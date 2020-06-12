import React, { SFC, useRef, useLayoutEffect, useState } from 'react'
import { scaleOrdinal, schemeCategory10, select, axisBottom, selectAll, axisLeft, line, range, scaleLinear } from 'd3'

export interface IBarProps {
  value?: number[][],
  category?: string[],
  legend?: string[]
}




export const Bar: SFC<IBarProps> = (props) => {
  const bar = useRef<HTMLDivElement>(null)
  const [chart] = useState<any>(barChart().x(scaleLinear().domain([-1, 32]))
  .y(scaleLinear().domain([0, 10])))

  useLayoutEffect(() => {
    if (bar.current === null) return

    const barDom = bar.current

    const numberOfSeries = 1, numberOfDataPoint = 31
    let data: any[] = []
    function randomData () {
      return Math.random() * 9
    }
    // function update () {
    //   data.forEach(serie => {
    //     serie.y = randomData()
    //   })
    //   chart.render()
    // }
    data = range(numberOfDataPoint).map((i: number) => {
      return { x: i, y: randomData() }
    })

    data.forEach(chart.addSeries)

    chart.render(barDom)

  }, [bar.current, chart])
  return <div ref={bar}></div>
}


function barChart () {
  const _chart:any = {}
  let _width = 600
  let _height = 300
  let _margins = { top: 30, right: 30, bottom: 30, left: 30 }
  let _data: any[] = []
  let _colors = scaleOrdinal(schemeCategory10)
  let _x: any, _y: any, _svg: any, _bodyG: any, _line: any

  function renderXAxis (axesG: any) {
    const xAxis = axisBottom().scale(_x.range([0, quadrantWidth()]))
    axesG.append('g')
    .attr('class', 'x axis')
    .attr('transform', () => `translate(${xStart()},${yStart()})`)
    .call(xAxis)
    selectAll('g.x g.tick')
    .append('line')
    .classed('grid-line', true)
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', 0)
    .attr('y2', - quadrantHeight())
  }

  function renderYAxis (axesG: any) {
    const yAxis = axisLeft().scale(_y.range([quadrantHeight(), 0]))
    axesG.append('g')
    .attr('class', 'y axis')
    .attr('transform', () => `translate(${xStart()},${yEnd()})`)
    .call(yAxis)
    selectAll('g.y g.tick')
    .append('line')
    .classed('grid-line', true)
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', quadrantWidth())
    .attr('y2', 0)
  }
  function renderAxes(svg: any) {
    const axesG = svg.append('g')
    .attr('class', 'axes')
    renderXAxis(axesG)
    renderYAxis(axesG)
  }
  function defineBodyClip (svg: any) {
    const padding = 5
    svg.append('defs')
    .append('clipPath')
    .attr('id', 'body-clip')
    .append('rect')
    .attr('x', 0 - padding)
    .attr('y', 0)
    .attr('width', quadrantWidth() + padding * 2)
    .attr('height', quadrantHeight())
  }
  function renderBody (svg: any) {
    if (!_bodyG) {
      _bodyG = svg.append('g')
      .attr('class', 'body')
      .attr('transform', `translate(${xStart()},${yEnd()})`)
      .attr('clip-path', 'url(#body-clip)')
    }
    renderBars()
  }
  function renderBars () {
    const padding = 2
    const bars = _bodyG.selectAll('rect.bar').data(_data)
    bars.enter()
    .append('rect')
    .merge(bars)
    .attr('class', 'bar')
    
    .transition()
    .attr('x', (d: any) => _x(d.x))
    .attr('y', (d: any) => _y(d.y))
    .attr('height', (d: any) => yStart() - _y(d.y))
    .attr('width', (d: any) => Math.floor(quadrantWidth() / _data.length) - padding)
  }
  function xStart () {
    return _margins.left
  }
  function yStart () {
    return _height - _margins.bottom
  }
  function xEnd () {
    return _width - _margins.right
  }
  function yEnd () {
    return _margins.top
  }
  function quadrantWidth () {
    return _width - _margins.left - _margins.right
  }
  function quadrantHeight () {
    return _height - _margins.top - _margins.bottom
  }
  _chart.width = function (w: any) {
    if (!arguments.length) return _width
    _width = w
    return _chart
  }
  _chart.height = function (h: any) {
    if (!arguments.length) return _height
    _height = h
    return _chart
  }
  _chart.margins = function (m: any) {
    if (!arguments.length) return _margins
    _margins = m
    return _chart
  }
  _chart.x = function (x: any) {
    if (!arguments.length) return _x
    _x = x
    return _chart
  }
  _chart.y = function (y) {
    if (!arguments.length) return _y
    _y = y
    return _chart
  }
  _chart.colors = function (c) {
    if (!arguments.length) return _colors
    _colors = c
    return _chart
  }
  _chart.addSeries = function (series: any) {
    _data.push(series)
    return _chart
  }
  _chart.render = function (dom: any) {
    if (!_svg) {
      _svg = select(dom).append('svg')
      .attr('width', _width)
      .attr('height', _height)
      renderAxes(_svg)
      defineBodyClip(_svg)
    }
    renderBody(_svg)
  }
  return _chart
}
