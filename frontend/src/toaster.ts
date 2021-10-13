import { toast } from '@zerodevx/svelte-toast';

export function toasterSuccess(msg: string) {
    toast.push(msg, {
        theme: {
            '--toastBackground': '#48BB78',
            '--toastBarBackground': '#2F855A',
        },
    });
}

export function toastrError(msg: string) {
    toast.push(msg, {
        theme: {
            '--toastBackground': '#F56565',
            '--toastBarBackground': '#C53030',
        },
    });
}
