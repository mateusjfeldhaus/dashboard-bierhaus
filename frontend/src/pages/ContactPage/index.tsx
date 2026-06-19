import { StyledContactCard, StyledContactGrid, StyledContactPage, StyledSection } from "./style";


export const ContactPage = () => {
    return (
        <StyledContactPage>

            <StyledSection>
                <h1>Bierhaus — Serviços de Bartender</h1>
                <p>
                    Olá! Me chamo <strong>Mateus João Feldhaus</strong>, sou bartender autônomo
                    apaixonado por coquetelaria. Atendo eventos particulares, festas e
                    confraternizações levando toda a estrutura necessária até você — drinks
                    autorais e clássicos preparados com qualidade e cuidado, diretamente
                    no seu evento.
                </p>
                <p>
                    O Bierhaus nasceu da necessidade de organizar e compartilhar minhas
                    receitas de forma prática durante os atendimentos. Hoje é uma
                    plataforma open-source disponível gratuitamente para qualquer bartender
                    que queira profissionalizar seu trabalho.
                </p>
            </StyledSection>

            <StyledSection>
                <h2>Área de Atuação</h2>
                <p>
                    Atendo na região da <strong>Grande Florianópolis</strong> — Palhoça,
                    São José e Florianópolis — e também em <strong>Lages</strong>, onde
                    tenho família e agenda frequente.
                </p>
                <p>
                    Os serviços são realizados de forma itinerante: levo os insumos,
                    equipamentos e toda a estrutura de bar mobile necessária para o seu
                    evento.
                </p>
                <ul>
                    <li>Festas de aniversário</li>
                    <li>Confraternizações</li>
                    <li>Casamentos e formaturas</li>
                    <li>Churrascos e eventos em residências</li>
                </ul>
            </StyledSection>

            <StyledSection>
                <h2>Contato</h2>
                <StyledContactGrid>
                    <StyledContactCard
                        href="https://wa.me/5548988705434"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span>📱</span>
                        <strong>WhatsApp</strong>
                        <p>(48) 98870-5434</p>
                    </StyledContactCard>

                    <StyledContactCard
                        href="mailto:mateus.feldhaus@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span>✉️</span>
                        <strong>E-mail</strong>
                        <p>mateus.feldhaus@gmail.com</p>
                    </StyledContactCard>

                    <StyledContactCard
                        href="https://www.instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span>📷</span>
                        <strong>Instagram</strong>
                        <p>@bierhaus</p>
                    </StyledContactCard>
                </StyledContactGrid>
            </StyledSection>

        </StyledContactPage>
    );
};