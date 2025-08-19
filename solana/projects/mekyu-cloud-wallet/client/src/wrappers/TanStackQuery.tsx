import type { Props } from "@/types/layouts"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const TanStackQuery:React.FC<Props>= ({children}) => {
    const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient} >
      {children}
    </QueryClientProvider>
  )
}

export default TanStackQuery
