import { Container, Card, Title, Text } from "@mantine/core";

export function ProfilePage() {
  return (
    <Container mt={24} mb={24} w={658}>
      <Card radius={12} p={24}>
        <Title order={2} fw={700} fz={26}>
          Иван Иванов
        </Title>
        <Text>
          Привет! Я - Frontend-разработчик. Пишу приложения на React +
          TypeScript + Redux Toolkit.
        </Text>
      </Card>
    </Container>
  );
}
