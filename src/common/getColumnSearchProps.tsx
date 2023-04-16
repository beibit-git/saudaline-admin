import { Button, Input, InputRef, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { FilterDropdownProps } from 'antd/lib/table/interface';

export const getColumnSearchProps = (dataIndex: string, inputRef: React.Ref<InputRef>) => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: FilterDropdownProps) => (
    <div style={{ padding: 8 }}>
      <Input
        ref={inputRef}
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => confirm()}
        style={{ marginBottom: 8, display: 'block' }}
      />
      <Space>
        <Button type="primary" onClick={() => confirm()} icon={<SearchOutlined />} size="small" style={{ width: 90 }}>
          Search
        </Button>
        <Button
          onClick={() => {
            clearFilters && clearFilters();
          }}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </Space>
    </div>
  ),
  filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
  onFilter: (value: any, record: any) => {
    return record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '';
  },
});
