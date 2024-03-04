import { Button, Input, Radio, Form } from "antd";
import "./filter.css";

const Filter = ({ setProduct }) => {
  const onFinish = (values) => {
    const { radiogroup, input } = values;
    setProduct({
      action: "filter",
      params: { [radiogroup]: Number(input) || input },
    });
  };

  return (
    <div className="filter">
      <Form onFinish={onFinish}>
        <Form.Item name="radiogroup">
          <Radio.Group>
            <Radio value={"brand"}>Brand</Radio>
            <Radio value={"product"}>Product</Radio>
            <Radio value={"price"}>Price</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="input">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="button">
            SEARCH
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Filter;
