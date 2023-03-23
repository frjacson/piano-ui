export const DefaultSelectCode = `
<Select placeholder="请选择" options={[
  { value: 'nihao' },
  { value: 'nihao2' },
  { value: 'nihao3' },
  { value: 'nihao4', disabled: true }]} />`

export const MultipleSelectCode = `
<Select placeholder="多选框" multiple options={[
  { value: 'nihao' },
  { value: 'nihao2' },
  { value: 'nihao3' },
  { value: 'nihao4', disabled: true }]} />`

export const DisabledSelectCode = `
<Select placeholder="禁选框" disabled options={[
  { value: 'nihao' },
  { value: 'nihao2' },
  { value: 'nihao3' },
  { value: 'nihao4', disabled: true }]} />`

export const SearchSelectCode = `
<Select
placeholder="多选框"
multiple
style={{margin-top: 200}}
options={[
  { value: 'a11' },
  { value: 'b12' },
  { value: 'c13' },
  { value: 'd14' },
]}
showSearch
/>`
