import { CategoriesDtoResponse } from '../../../../../interfaces/Categories/CategoriesDtoResponse';
import { Select } from 'antd';

const { Option } = Select;

type Options = CategoriesDtoResponse[];

interface Props {
  placeholder: string;
  selectedOption: number | undefined;
  onSelect: (value: number) => void;
  options: Options;
  width?: number | string;
  onClear: () => void;
  loading: boolean;
  componentSize?: 'large' | 'middle' | 'small';
}

const PromotionCategoryFilter = ({
  placeholder,
  selectedOption,
  onSelect,
  options,
  width,
  componentSize,
  onClear,
  loading,
}: Props) => {
  return (
    <Select
      showSearch
      disabled={loading}
      loading={loading}
      size={componentSize}
      placeholder={placeholder}
      value={selectedOption}
      onSelect={onSelect}
      style={{ width: width ? width : '100%' }}
      optionFilterProp="children"
      allowClear
      onClear={onClear}
    >
      {options.map((option) => (
        <Option key={option.id} value={option.id}>
          {option.title}
        </Option>
      ))}
    </Select>
  );
};

export default PromotionCategoryFilter;
