import { Card, Tag, Button, Alert, Space, Divider } from 'antd';
import {
    CheckCircleOutlined,
    WarningOutlined,
    CloseCircleOutlined,
} from '@ant-design/icons';
import { darkColors, lightColors } from '../constants';

const ColorDemo = ({ isDarkMode }) => {
    const colors = isDarkMode ? darkColors : lightColors;

    const colorBoxStyle = (color) => ({
        backgroundColor: color,
        width: '100%',
        height: '60px',
        borderRadius: '6px',
        border: `1px solid ${colors.borders}`,
        marginBottom: '8px',
    });

    return (
        <div>
            <h2 style={{ color: colors.text.primary, marginBottom: '24px' }}>
                Color Palette Demo
            </h2>

            {/* Background Colors */}
            <Card
                title="Background Colors"
                style={{
                    marginBottom: '24px',
                    background: colors.background.surface,
                    borderColor: colors.borders,
                }}
                headStyle={{ color: colors.text.primary, borderBottomColor: colors.borders }}
            >
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <div>
                        <div style={colorBoxStyle(colors.background.base)} />
                        <div style={{ color: colors.text.secondary }}>Base Background: {colors.background.base}</div>
                    </div>
                    <div>
                        <div style={colorBoxStyle(colors.background.surface)} />
                        <div style={{ color: colors.text.secondary }}>Surface/Cards: {colors.background.surface}</div>
                    </div>
                    <div>
                        <div style={colorBoxStyle(colors.background.elevated)} />
                        <div style={{ color: colors.text.secondary }}>Elevated/Hover: {colors.background.elevated}</div>
                    </div>
                </Space>
            </Card>

            {/* Text Colors */}
            <Card
                title="Text Colors"
                style={{
                    marginBottom: '24px',
                    background: colors.background.surface,
                    borderColor: colors.borders,
                }}
                headStyle={{ color: colors.text.primary, borderBottomColor: colors.borders }}
            >
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <div>
                        <div style={{ color: colors.text.primary, fontSize: '18px', fontWeight: 'bold' }}>
                            Primary Text - {colors.text.primary}
                        </div>
                        <div style={{ color: colors.text.primary, marginTop: '4px' }}>
                            This is an example of primary text color.
                        </div>
                    </div>
                    <div>
                        <div style={{ color: colors.text.secondary, fontSize: '16px' }}>
                            Secondary Text - {colors.text.secondary}
                        </div>
                        <div style={{ color: colors.text.secondary, marginTop: '4px' }}>
                            This is an example of secondary text color.
                        </div>
                    </div>
                    <div>
                        <div style={{ color: colors.text.muted, fontSize: '14px' }}>
                            Muted Text - {colors.text.muted}
                        </div>
                        <div style={{ color: colors.text.muted, marginTop: '4px' }}>
                            This is an example of muted text color.
                        </div>
                    </div>
                </Space>
            </Card>

            {/* Accent Colors */}
            <Card
                title="Accent Colors"
                style={{
                    marginBottom: '24px',
                    background: colors.background.surface,
                    borderColor: colors.borders,
                }}
                headStyle={{ color: colors.text.primary, borderBottomColor: colors.borders }}
            >
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <div>
                        <div style={colorBoxStyle(colors.accent.primary)} />
                        <div style={{ color: colors.text.secondary }}>Primary Accent: {colors.accent.primary}</div>
                        <Button
                            type="primary"
                            style={{ marginTop: '12px', backgroundColor: colors.accent.primary }}
                        >
                            Primary Button
                        </Button>
                    </div>

                    <Divider style={{ borderColor: colors.borders, margin: '12px 0' }} />

                    <div>
                        <div style={colorBoxStyle(colors.accent.success)} />
                        <div style={{ color: colors.text.secondary }}>Success: {colors.accent.success}</div>
                        <Alert
                            message="Success Message"
                            description="This is a success alert example"
                            type="success"
                            icon={<CheckCircleOutlined />}
                            style={{ marginTop: '12px', backgroundColor: colors.accent.success + '20', borderColor: colors.accent.success }}
                            showIcon
                        />
                    </div>

                    <Divider style={{ borderColor: colors.borders, margin: '12px 0' }} />

                    <div>
                        <div style={colorBoxStyle(colors.accent.warning)} />
                        <div style={{ color: colors.text.secondary }}>Warning: {colors.accent.warning}</div>
                        <Alert
                            message="Warning Message"
                            description="This is a warning alert example"
                            type="warning"
                            icon={<WarningOutlined />}
                            style={{ marginTop: '12px', backgroundColor: colors.accent.warning + '20', borderColor: colors.accent.warning }}
                            showIcon
                        />
                    </div>

                    <Divider style={{ borderColor: colors.borders, margin: '12px 0' }} />

                    <div>
                        <div style={colorBoxStyle(colors.accent.error)} />
                        <div style={{ color: colors.text.secondary }}>Error: {colors.accent.error}</div>
                        <Alert
                            message="Error Message"
                            description="This is an error alert example"
                            type="error"
                            icon={<CloseCircleOutlined />}
                            style={{ marginTop: '12px', backgroundColor: colors.accent.error + '20', borderColor: colors.accent.error }}
                            showIcon
                        />
                    </div>

                    <Divider style={{ borderColor: colors.borders, margin: '12px 0' }} />

                    <div>
                        <div style={colorBoxStyle(colors.accent.purple)} />
                        <div style={{ color: colors.text.secondary }}>Purple Accent: {colors.accent.purple}</div>
                        <Tag color={colors.accent.purple} style={{ marginTop: '12px', backgroundColor: colors.accent.purple, border: 'none' }}>
                            Purple Tag
                        </Tag>
                    </div>
                </Space>
            </Card>

            {/* Border Color */}
            <Card
                title="Border Example"
                style={{
                    background: colors.background.surface,
                    borderColor: colors.borders,
                }}
                headStyle={{ color: colors.text.primary, borderBottomColor: colors.borders }}
            >
                <div
                    style={{
                        border: `2px solid ${colors.borders}`,
                        padding: '16px',
                        borderRadius: '6px',
                        color: colors.text.primary,
                    }}
                >
                    This box uses the border color: {colors.borders}
                </div>
            </Card>
        </div>
    );
};

export default ColorDemo;