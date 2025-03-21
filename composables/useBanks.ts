import { ref, onMounted } from "vue";
import api from "~/api/clients";
import type { Bank } from "~/api/api";

export function useBanks() {
  const banks = ref<Bank[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);

  onMounted(async () => {
    try {
      const response = await api.get<Bank[]>("/banks");
      banks.value = response.data;
    } catch (err) {
      error.value = "Ошибка загрузки банков";
    } finally {
      loading.value = false;
    }
  });

  return { banks, loading, error };
}
