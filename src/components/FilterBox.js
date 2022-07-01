import React from 'react'
import DropDown from './DropDown'

const priceOpt = (base = 0.25, max = 10, pref = '') => {
  var num = [{ id: base, name: pref + ' - ' + base }]
  for (let index = 1; index < max; index++) {
    var val = num[num.length - 1].id + num[num.length - 1].id
    if (val == 4) val = 5
    num.push({ id: val, name: pref + '- ' + val })
  }
  return num
}

export default function FilterBox(props) {
  return (
    <div class="flex items-center">
      {/* <p class="mr-5">Min-coin price</p> */}
      <DropDown
        class="w-[250px] mr-5"
        placeholder="Max coin-price"
        options={priceOpt(undefined, 15, 'Max coin-price')}
        onChange={(val) => props?.onChange(val, 'price')}
        type="number"
      />
      {/* <p class="mx-5">Min-Diffrence</p> */}
      <DropDown
        class="w-[250px]"
        options={priceOpt(undefined, 8, 'Max-Diffrence')}
        placeholder="Max-Diffrence"
        onChange={(val) => props?.onChange(val, 'diff')}
        type="number"
      />
    </div>
  )
}
