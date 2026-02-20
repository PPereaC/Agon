import React from "react";
import { Tabs, Tab } from "@heroui/tabs";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Monitor, Cpu, HardDrive, MemoryStick, Gamepad } from "lucide-react";

const parseRequirements = (text) => {
    if (!text) return null;

    const requirements = {};
    
    // Extraer OS - maneja saltos de línea y espacios
    const osMatch = text.match(/OS:\s*([\s\S]*?)(?=\n?Processor:|\n?$)/i);
    if (osMatch) requirements.os = osMatch[1].trim().replace(/\n/g, ' ');
    
    // Extraer Processor
    const processorMatch = text.match(/Processor:\s*([\s\S]*?)(?=\n?Memory:|\n?$)/i);
    if (processorMatch) requirements.processor = processorMatch[1].trim().replace(/\n/g, ' ');
    
    // Extraer Memory
    const memoryMatch = text.match(/Memory:\s*([\s\S]*?)(?=\n?Graphics:|\n?Network:|\n?$)/i);
    if (memoryMatch) requirements.memory = memoryMatch[1].trim().replace(/\n/g, ' ');
    
    // Extraer Graphics
    const graphicsMatch = text.match(/Graphics:\s*([\s\S]*?)(?=\n?Network:|\n?Storage:|\n?$)/i);
    if (graphicsMatch) requirements.graphics = graphicsMatch[1].trim().replace(/\n/g, ' ');
    
    // Extraer Storage
    const storageMatch = text.match(/Storage:\s*([\s\S]*?)(?=\n?Sound Card:|\n?Additional Notes:|\n?$)/i);
    if (storageMatch) {
        const storageText = storageMatch[1].trim();
        // Extraer solo el número y "GB"
        const sizeMatch = storageText.match(/(\d+\s*(?:GB|MB))/i);
        requirements.storage = sizeMatch ? sizeMatch[1] + ' de almacenamiento disponible' : storageText.replace(/\n/g, ' ');
    }
    
    return requirements;
};

const RequirementItem = ({ icon: Icon, label, value }) => {
    if (!value) return null;
    
    return (
        <div className="flex gap-3 items-start">
            <div className="mt-1 flex-shrink-0">
                <Icon size={18} className="text-blue-400" />
            </div>
            <div className="flex-1">
                <div className="text-gray-400 text-sm font-medium mb-1">{label}</div>
                <div className="text-white text-sm leading-relaxed">{value}</div>
            </div>
        </div>
    );
};

export function SystemRequirementsTabs({ requirements }) {
    const [selected, setSelected] = React.useState("minimo");

    const minimum = parseRequirements(requirements?.minimum);
    const recommended = parseRequirements(requirements?.recommended);

    if (!minimum && !recommended) {
        return (
            <div className="text-gray-400 text-center py-4">
                No hay información de requisitos disponible
            </div>
        );
    }

    return (
        <div className="flex w-full flex-col">
            <Tabs 
                aria-label="Options" 
                selectedKey={selected} 
                onSelectionChange={setSelected}
                variant="bordered"
                classNames={{
                    tabList: "bg-zinc-900/50 backdrop-blur-sm border border-white/10 p-1 rounded-lg gap-2 w-full",
                    tab: "text-gray-400 h-10 flex-1",
                    cursor: "bg-zinc-800 border border-white/20 rounded-md shadow-lg",
                    tabContent: "group-data-[selected=true]:text-white"
                }}
            >
                {minimum && (
                    <Tab key="minimo" title="Mínimo">
                        <div className="mt-4 space-y-4 text-justify">
                            <RequirementItem icon={Monitor} label="Sistema Operativo" value={minimum.os} />
                            <RequirementItem icon={Cpu} label="Procesador" value={minimum.processor} />
                            <RequirementItem icon={MemoryStick} label="Memoria RAM" value={minimum.memory} />
                            <RequirementItem icon={Gamepad} label="Gráficos" value={minimum.graphics} />
                            <RequirementItem icon={HardDrive} label="Almacenamiento" value={minimum.storage} />
                        </div>
                    </Tab>
                )}
                {recommended && (
                    <Tab key="recomendados" title="Recomendados">
                        <div className="mt-4 space-y-4 text-justify">
                            <RequirementItem icon={Monitor} label="Sistema Operativo" value={recommended.os} />
                            <RequirementItem icon={Cpu} label="Procesador" value={recommended.processor} />
                            <RequirementItem icon={MemoryStick} label="Memoria RAM" value={recommended.memory} />
                            <RequirementItem icon={Gamepad} label="Gráficos" value={recommended.graphics} />
                            <RequirementItem icon={HardDrive} label="Almacenamiento" value={recommended.storage} />
                        </div>
                    </Tab>
                )}
            </Tabs>
        </div>
    );
}

export default SystemRequirementsTabs;