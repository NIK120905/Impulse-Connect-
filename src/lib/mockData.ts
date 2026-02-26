import { Chat, Project, Connection } from './types';

export const initialChats: Chat[] = [
    {
        id: '1',
        title: 'Message to my manager about deadline',
        dateGroup: 'TODAY',
        colorDot: 'bg-red-500',
        timestampStr: '2h ago',
        messages: [
            {
                id: 'msg_1',
                role: 'user',
                content: `I can't believe you moved the deadline AGAIN without even asking me. 
I've been working nights and weekends for this and you just casually 
shift everything like my time means nothing. This is so unfair and 
I'm honestly done being treated this way.`,
                timestamp: '11:42 AM'
            },
            {
                id: 'msg_2',
                role: 'ai',
                content: `I've analyzed your message. Here's what I found:`,
                timestamp: '11:42 AM',
                analysis: {
                    score: 91,
                    flaggedPhrases: ["can't believe", "so unfair", "done being treated this way"],
                    rewrite: `I wanted to flag some concern about the deadline change — I've invested significant time outside of hours and I'd appreciate being looped into scheduling decisions earlier. Could we find a time to discuss workload expectations?`
                }
            },
            {
                id: 'msg_3',
                role: 'user',
                content: `I wanted to flag some concern about the deadline change — I've invested significant time outside of hours and I'd appreciate being looped into scheduling decisions earlier. Could we find a time to discuss workload expectations?`,
                timestamp: '11:43 AM'
            }
        ]
    },
    {
        id: '2',
        title: 'Email draft to professor',
        dateGroup: 'TODAY',
        colorDot: 'bg-orange-500',
        timestampStr: '4h ago',
        messages: []
    },
    {
        id: '3',
        title: 'Angry Slack to teammate',
        dateGroup: 'TODAY',
        colorDot: 'bg-red-600',
        timestampStr: '6h ago',
        messages: []
    },
    {
        id: '4',
        title: 'Breakup text I almost sent',
        dateGroup: 'YESTERDAY',
        colorDot: 'bg-purple-500',
        timestampStr: 'Yesterday',
        messages: []
    },
    {
        id: '5',
        title: 'Response to bad review',
        dateGroup: 'YESTERDAY',
        colorDot: 'bg-yellow-500',
        timestampStr: 'Yesterday',
        messages: []
    },
    {
        id: '6',
        title: 'Email to difficult client',
        dateGroup: 'THIS WEEK',
        colorDot: 'bg-blue-500',
        timestampStr: 'Mon',
        messages: []
    },
    {
        id: '7',
        title: 'Text to ex',
        dateGroup: 'THIS WEEK',
        colorDot: 'bg-pink-500',
        timestampStr: 'Mon',
        messages: []
    },
    {
        id: '8',
        title: 'Complaint to landlord',
        dateGroup: 'THIS WEEK',
        colorDot: 'bg-orange-600',
        timestampStr: 'Sun',
        messages: []
    },
    {
        id: '9',
        title: 'Job resignation draft',
        dateGroup: 'EARLIER',
        colorDot: 'bg-red-500',
        timestampStr: 'Jan 12',
        messages: []
    },
    {
        id: '10',
        title: 'Family group chat rant',
        dateGroup: 'EARLIER',
        colorDot: 'bg-purple-600',
        timestampStr: 'Jan 8',
        messages: []
    }
];

export const mockProjects: Project[] = [
    {
        id: 'p1',
        name: 'Work Emails',
        emoji: '📧',
        chatCount: 4,
        updatedStr: '2h ago',
        chats: []
    },
    {
        id: 'p2',
        name: 'Relationship Texts',
        emoji: '💬',
        chatCount: 3,
        updatedStr: 'yesterday',
        chats: []
    },
    {
        id: 'p3',
        name: 'Professional Slack',
        emoji: '👔',
        chatCount: 2,
        updatedStr: 'Mon',
        chats: []
    },
    {
        id: 'p4',
        name: 'Family Group Chat',
        emoji: '👨‍👩‍👧',
        chatCount: 1,
        updatedStr: 'Jan 8',
        chats: []
    }
];

export const mockConnections: Connection[] = [
    {
        id: 'c1',
        platform: 'Gmail',
        description: 'Review before sending',
        icon: '📧',
        status: 'Coming Soon'
    },
    {
        id: 'c2',
        platform: 'Slack',
        description: 'Catch hot takes',
        icon: '💬',
        status: 'Coming Soon'
    },
    {
        id: 'c3',
        platform: 'WhatsApp',
        description: 'Stop that 2am text',
        icon: '📱',
        status: 'Coming Soon'
    },
    {
        id: 'c4',
        platform: 'Telegram',
        description: 'Think twice',
        icon: '✈️',
        status: 'Coming Soon'
    },
    {
        id: 'c5',
        platform: 'Zoho',
        description: 'Professional filter',
        icon: '🏢',
        status: 'Coming Soon'
    },
    {
        id: 'c6',
        platform: 'Outlook',
        description: 'Work email guard',
        icon: '📩',
        status: 'Coming Soon'
    }
];
