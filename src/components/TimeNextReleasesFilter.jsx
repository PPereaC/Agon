import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export const TimeNextReleasesFilter = ({ onChange, value }) => {

    const today = new Date().toISOString().split('T')[0];
    const proximaSemana = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const proximoMes = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const esteAnio = new Date(new Date().getFullYear(), 11, 31).toISOString().split('T')[0];

    const handleValueChange = (newValue) => {
        onChange(newValue);
    };

    return (
        <Select onValueChange={handleValueChange} value={value}>
            <SelectTrigger className="w-full md:max-w-50 border border-white/80 bg-[#020617]">
                <SelectValue placeholder="Seleccionar período" />
            </SelectTrigger>
            <SelectContent className="bg-[#0a0a0a] border-white/20">
                <SelectGroup>
                    <SelectLabel className="text-gray-400">Fecha</SelectLabel>
                    <SelectItem value={proximaSemana} className="text-white hover:bg-white/80 cursor-pointer">Próxima semana</SelectItem>
                    <SelectItem value={proximoMes} className="text-white hover:bg-white/80 cursor-pointer">Próximo mes</SelectItem>
                    <SelectItem value={esteAnio} className="text-white hover:bg-white/80 cursor-pointer">Este año</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default TimeNextReleasesFilter;