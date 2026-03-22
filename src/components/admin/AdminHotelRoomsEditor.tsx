"use client"

import {
  ArrowDownIcon,
  ArrowUpIcon,
  EyeIcon,
  EyeSlashIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"
import AdminSectionCard from "@/components/admin/AdminSectionCard"
import AdminTextFieldCard from "@/components/admin/AdminTextFieldCard"
import {
  createEmptyAdminHotelRoomDraftItem,
  type AdminHotelRoomDraftItem,
} from "@/lib/admin-studio/card-collections"

function normalizeRooms(rooms: AdminHotelRoomDraftItem[]) {
  return [...rooms]
    .sort((left, right) => left.sortOrder - right.sortOrder)
    .map((room, index) => ({
      ...room,
      sortOrder: index,
    }))
}

function createNewRoom(existingRooms: AdminHotelRoomDraftItem[]) {
  const nextIndex = existingRooms.length + 1

  return createEmptyAdminHotelRoomDraftItem(existingRooms.length, {
    id: `hotel-room-${crypto.randomUUID()}`,
    name: `Quarto ${nextIndex}`,
    visible: false,
    ctaLabel: "Reservar",
    maxRooms: 3,
  })
}

function updateRoomField(
  rooms: AdminHotelRoomDraftItem[],
  roomId: string,
  field: keyof AdminHotelRoomDraftItem,
  value: AdminHotelRoomDraftItem[keyof AdminHotelRoomDraftItem],
) {
  return rooms.map((room) =>
    room.id === roomId
      ? {
          ...room,
          [field]: value,
        }
      : room,
  )
}

function moveRoom(
  rooms: AdminHotelRoomDraftItem[],
  roomId: string,
  direction: -1 | 1,
) {
  const currentIndex = rooms.findIndex((room) => room.id === roomId)
  const nextIndex = currentIndex + direction

  if (currentIndex < 0 || nextIndex < 0 || nextIndex >= rooms.length) {
    return rooms
  }

  const nextRooms = [...rooms]
  const [selected] = nextRooms.splice(currentIndex, 1)
  nextRooms.splice(nextIndex, 0, selected)

  return normalizeRooms(nextRooms)
}

function deleteRoom(rooms: AdminHotelRoomDraftItem[], roomId: string) {
  return normalizeRooms(rooms.filter((room) => room.id !== roomId))
}

function parseAmenities(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean)
}

export default function AdminHotelRoomsEditor({
  draftRooms,
  liveRooms,
  onRoomsChange,
}: {
  draftRooms: AdminHotelRoomDraftItem[]
  liveRooms: AdminHotelRoomDraftItem[]
  onRoomsChange: (rooms: AdminHotelRoomDraftItem[]) => void
}) {
  const normalizedDraftRooms = normalizeRooms(draftRooms)

  return (
    <AdminSectionCard
      eyebrow="Quartos / Acomodacoes"
      title="Disponibilidade por tipo de quarto"
      description="Monte as acomodacoes do hotel, ajuste preco e politicas e escolha o que pode aparecer na pagina publica."
      actions={
        <button
          type="button"
          onClick={() => onRoomsChange(normalizeRooms([...normalizedDraftRooms, createNewRoom(normalizedDraftRooms)]))}
          className="inline-flex items-center justify-center rounded-full bg-[#0B1C2C] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#10283d]"
        >
          <PlusIcon className="mr-2 h-5 w-5" />
          Adicionar quarto
        </button>
      }
    >
      {normalizedDraftRooms.length === 0 ? (
        <div className="rounded-[1.4rem] border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm leading-7 text-slate-600">
          Nenhum quarto configurado ainda. Adicione acomodacoes aqui para mostrar disponibilidade direto na pagina do hotel.
        </div>
      ) : (
        <div className="space-y-5">
          {normalizedDraftRooms.map((room, index) => {
            const liveRoom =
              liveRooms.find((candidate) => candidate.id === room.id) ??
              createEmptyAdminHotelRoomDraftItem(index)

            return (
              <div
                key={room.id}
                className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.05)]"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                      Quarto {index + 1}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-[#0B1C2C]">
                      {room.name || "Nome do quarto pendente"}
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {room.occupancy || "Capacidade pendente"}
                      {room.price ? ` - ${room.price}` : ""}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => onRoomsChange(updateRoomField(normalizedDraftRooms, room.id, "visible", !room.visible))}
                      className={`inline-flex items-center rounded-full px-3 py-2 text-xs font-semibold transition ${
                        room.visible
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {room.visible ? (
                        <>
                          <EyeIcon className="mr-2 h-4 w-4" />
                          No site
                        </>
                      ) : (
                        <>
                          <EyeSlashIcon className="mr-2 h-4 w-4" />
                          Oculto
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => onRoomsChange(moveRoom(normalizedDraftRooms, room.id, -1))}
                      className="inline-flex items-center justify-center rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300"
                    >
                      <ArrowUpIcon className="mr-2 h-4 w-4" />
                      Subir
                    </button>

                    <button
                      type="button"
                      onClick={() => onRoomsChange(moveRoom(normalizedDraftRooms, room.id, 1))}
                      className="inline-flex items-center justify-center rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300"
                    >
                      <ArrowDownIcon className="mr-2 h-4 w-4" />
                      Descer
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const confirmed = window.confirm("Remover este quarto da hospedagem?")

                        if (!confirmed) {
                          return
                        }

                        onRoomsChange(deleteRoom(normalizedDraftRooms, room.id))
                      }}
                      className="inline-flex items-center justify-center rounded-full border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:border-rose-300 hover:bg-rose-50"
                    >
                      <TrashIcon className="mr-2 h-4 w-4" />
                      Excluir
                    </button>
                  </div>
                </div>

                <div className="mt-5 grid gap-5 xl:grid-cols-2">
                  <AdminTextFieldCard
                    label="Nome do quarto"
                    helper="Ex.: Quarto Duplo, Suite Vista Rio ou Bangalo Familia."
                    liveValue={liveRoom.name}
                    value={room.name}
                    onChange={(value) => onRoomsChange(updateRoomField(normalizedDraftRooms, room.id, "name", value))}
                  />
                  <AdminTextFieldCard
                    label="Categoria"
                    helper="Campo opcional para organizar a leitura. Ex.: Standard, Superior, Premium."
                    liveValue={liveRoom.category}
                    value={room.category}
                    onChange={(value) => onRoomsChange(updateRoomField(normalizedDraftRooms, room.id, "category", value))}
                  />
                  <AdminTextFieldCard
                    label="Capacidade"
                    helper="Ex.: 2 pessoas, 3 adultos ou casal + 1 crianca."
                    liveValue={liveRoom.occupancy}
                    value={room.occupancy}
                    onChange={(value) => onRoomsChange(updateRoomField(normalizedDraftRooms, room.id, "occupancy", value))}
                  />
                  <AdminTextFieldCard
                    label="Tipo de cama"
                    helper="Ex.: 1 cama de casal, 2 camas de solteiro ou 1 cama queen."
                    liveValue={liveRoom.beds}
                    value={room.beds}
                    onChange={(value) => onRoomsChange(updateRoomField(normalizedDraftRooms, room.id, "beds", value))}
                  />
                  <AdminTextFieldCard
                    label="Preco"
                    helper="Ex.: R$ 420 / noite ou Sob consulta."
                    liveValue={liveRoom.price}
                    value={room.price}
                    onChange={(value) => onRoomsChange(updateRoomField(normalizedDraftRooms, room.id, "price", value))}
                  />
                  <AdminTextFieldCard
                    label="Informacoes de taxa"
                    helper="Campo opcional. Ex.: taxas inclusas, impostos a confirmar ou servico nao incluso."
                    liveValue={liveRoom.taxesInfo}
                    value={room.taxesInfo}
                    onChange={(value) => onRoomsChange(updateRoomField(normalizedDraftRooms, room.id, "taxesInfo", value))}
                  />
                  <AdminTextFieldCard
                    label="Cancelamento"
                    helper="Resumo curto da politica de cancelamento para a linha de beneficios."
                    liveValue={liveRoom.cancellation}
                    value={room.cancellation}
                    onChange={(value) => onRoomsChange(updateRoomField(normalizedDraftRooms, room.id, "cancellation", value))}
                  />
                  <AdminTextFieldCard
                    label="Pagamento"
                    helper="Resumo curto da forma de pagamento. Ex.: cartao no local, pix antecipado ou sinal de reserva."
                    liveValue={liveRoom.payment}
                    value={room.payment}
                    onChange={(value) => onRoomsChange(updateRoomField(normalizedDraftRooms, room.id, "payment", value))}
                  />
                  <AdminTextFieldCard
                    label="Texto do botao"
                    helper="Ex.: Reservar, Selecionar acomodacao ou Consultar quarto."
                    liveValue={liveRoom.ctaLabel}
                    value={room.ctaLabel}
                    onChange={(value) => onRoomsChange(updateRoomField(normalizedDraftRooms, room.id, "ctaLabel", value))}
                  />
                  <AdminTextFieldCard
                    label="Link do quarto"
                    helper="Opcional para a proxima etapa. Pode apontar para WhatsApp, link interno ou deixar vazio por enquanto."
                    liveValue={liveRoom.ctaTarget}
                    value={room.ctaTarget}
                    onChange={(value) => onRoomsChange(updateRoomField(normalizedDraftRooms, room.id, "ctaTarget", value))}
                  />
                  <AdminTextFieldCard
                    label="Quantidade maxima"
                    helper="Limite de selecao por tipo. Deixe vazio para usar o limite padrao da interface."
                    liveValue={liveRoom.maxRooms ? liveRoom.maxRooms.toString() : ""}
                    value={room.maxRooms ? room.maxRooms.toString() : ""}
                    onChange={(value) =>
                      onRoomsChange(
                        updateRoomField(
                          normalizedDraftRooms,
                          room.id,
                          "maxRooms",
                          value.trim().length > 0 && Number.isFinite(Number(value))
                            ? Number(value)
                            : null,
                        ),
                      )
                    }
                    placeholder="ex.: 3"
                  />
                </div>

                <div className="mt-5 grid gap-5 xl:grid-cols-[1.4fr_0.6fr]">
                  <AdminTextFieldCard
                    label="Comodidades"
                    helper="Escreva uma comodidade por linha. Ex.: Wi-Fi, ar-condicionado, varanda, vista para o rio."
                    liveValue={liveRoom.amenities.join("\n")}
                    value={room.amenities.join("\n")}
                    onChange={(value) =>
                      onRoomsChange(updateRoomField(normalizedDraftRooms, room.id, "amenities", parseAmenities(value)))
                    }
                    multiline
                  />

                  <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-4">
                    <p className="text-sm font-semibold text-[#0B1C2C]">Cafe da manha</p>
                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      Ligue ou desligue este destaque para aparecer na coluna de beneficios do quarto.
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        onRoomsChange(
                          updateRoomField(
                            normalizedDraftRooms,
                            room.id,
                            "breakfastIncluded",
                            !room.breakfastIncluded,
                          ),
                        )
                      }
                      className={`mt-4 inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition ${
                        room.breakfastIncluded
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {room.breakfastIncluded ? "Cafe incluso" : "Sem cafe incluido"}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </AdminSectionCard>
  )
}
