'use client'
import { UnauthorizedError } from "#/components/Errors";
import Section from "#/components/Section";
import Tooltip from "#/components/Tooltip";
import {
    XIcon,
    MenuIcon,

    ActiveDevIcon,

    Boost1MonthIcon,
    Boost2MonthIcon,
    Boost3MonthIcon,
    Boost6MonthIcon,
    Boost9MonthIcon,
    Boost12MonthIcon,
    Boost15MonthIcon,
    Boost18MonthIcon,
    Boost24MonthIcon,

    BugHunterIcon,
    BugHunter2Icon,

    CertifiedModIcon,
    EarlySupporterIcon,

    HypeSquadBalanceIcon,
    HypeSquadBraveryIcon,
    HypeSquadBrillianceIcon,

    NitroIcon,
    PartnerIcon,
    ServerOwnerIcon,
    ServerPartneredIcon,
    ServerVerifiedIcon,
    StaffIcon,
    VerifiedBotIcon,

} from "#/icons"

export default function Tools() {

    return (
        <>
            <Section title="Icons">
                {/* make each icon next to each other */}
                {/* <div className=""> */}
                <b>Discord:</b>
                <div className="flex flex-wrap">
                    <Icon title="Active Developer"> <ActiveDevIcon /></Icon>
                    <Icon title="Bug Hunter"> <BugHunterIcon /></Icon>
                    <Icon title="Bug Hunter 2"> <BugHunter2Icon /></Icon>
                    <Icon title="Certified Moderator"> <CertifiedModIcon /></Icon>
                    <Icon title="Early Supporter"> <EarlySupporterIcon /></Icon>
                    <Icon title="HypeSquad Balance"> <HypeSquadBalanceIcon /></Icon>
                    <Icon title="HypeSquad Bravery"> <HypeSquadBraveryIcon /></Icon>
                    <Icon title="HypeSquad Brilliance"> <HypeSquadBrillianceIcon /></Icon>
                    <Icon title="Nitro"> <NitroIcon /></Icon>
                    <Icon title="Partnered Server Owner"> <PartnerIcon /></Icon>
                    <Icon title="Server Owner"> <ServerOwnerIcon /></Icon>
                    <Icon title="Server Partnered"> <ServerPartneredIcon /></Icon>
                    <Icon title="Server Verified"> <ServerVerifiedIcon /></Icon>
                    <Icon title="Staff"> <StaffIcon /></Icon>
                    <Icon title="Early Verified Bot Developer"> <VerifiedBotIcon /></Icon>

                    <Icon title="Boost 1 Month"> <Boost1MonthIcon /></Icon>
                    <Icon title="Boost 2 Month"> <Boost2MonthIcon /></Icon>
                    <Icon title="Boost 3 Month"> <Boost3MonthIcon /></Icon>
                    <Icon title="Boost 6 Month"> <Boost6MonthIcon /></Icon>
                    <Icon title="Boost 9 Month"> <Boost9MonthIcon /></Icon>
                    <Icon title="Boost 12 Month"> <Boost12MonthIcon /></Icon>
                    <Icon title="Boost 15 Month"> <Boost15MonthIcon /></Icon>
                    <Icon title="Boost 18 Month"> <Boost18MonthIcon /></Icon>
                    <Icon title="Boost 24 Month"> <Boost24MonthIcon /></Icon>

                </div>
                <br />
                <b>General:</b>
                <div className="flex flex-wrap">

                    <Icon title="Close Icon"> <XIcon className="!w-full !h-full" /></Icon>
                    <Icon title="Menu Icon"> <MenuIcon className="!w-full !h-full" /></Icon>


                </div>

            </Section>

            <Section title="Unauthorized Error (discord)">
                <UnauthorizedError type="discord" />

            </Section>
        </>
    )
}


const Icon = ({ title, children }: { title: string, children: React.ReactNode }) => {
    return (
        <div className="m-1 p-1 hover:bg-gray-200 hover:dark:bg-gray-800  rounded-md">
            <Tooltip title={title}>
                <div className="w-7 h-7 md:w-10 md:h-10 align-middle">
                    <i className="align-middle !w-full !h-full">
                        {children}

                    </i>

                </div>
            </Tooltip>
        </div>
    )
}