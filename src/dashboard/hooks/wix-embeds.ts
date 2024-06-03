import { useWixModules } from "@wix/sdk-react";
import { embeddedScripts } from '@wix/app-market';
import { useQuery, useMutation, useQueryClient } from 'react-query'

export const QUERY_EMBEDS = 'queryEmbeds';
export const MUTATE_EMBEDS = 'mutateEMbeds';


export const useEmbeds = <T extends Record<string, string>>() =>{

    const embeddedScriptsModule = useWixModules(embeddedScripts);
    const queryClient = useQueryClient();

    const getEmbeddedScript = useQuery<unknown, unknown, T>({
        queryKey: [QUERY_EMBEDS],
        refetchOnWindowFocus: false,
        queryFn: async () => {
            const embeddedScript = await embeddedScriptsModule.getEmbeddedScript();
            return embeddedScript.parameters || {};
        }
    });

    const embedScript = useMutation<unknown, unknown, T>({
        mutationKey: [MUTATE_EMBEDS],
        mutationFn: async (parameters) => {
            await embeddedScriptsModule.embedScript({parameters});
            return parameters;
        },
        onSuccess: (data) => {
            queryClient.setQueryData([QUERY_EMBEDS], data);
        },
    });

    return { embedScript, getEmbeddedScript }
}